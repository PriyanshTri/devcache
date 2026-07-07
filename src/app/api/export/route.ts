import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getUserExportData } from '@/lib/db/export';
import archiver from 'archiver';
import { PassThrough } from 'stream';

function getDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const format = request.nextUrl.searchParams.get('format') || 'json';

  if (format !== 'json' && format !== 'zip') {
    return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
  }

  // ZIP export is Pro-only
  if (format === 'zip' && !(session.user.isPro ?? false)) {
    return NextResponse.json(
      { error: 'ZIP export requires a Pro subscription' },
      { status: 403 }
    );
  }

  const data = await getUserExportData(session.user.id);
  const dateStr = getDateString();

  if (format === 'json') {
    const json = JSON.stringify(data, null, 2);
    return new NextResponse(json, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="devcache-export-${dateStr}.json"`,
      },
    });
  }

  // ZIP format: JSON manifest + actual files from R2
  const archive = archiver('zip', { zlib: { level: 9 } });
  const chunks: Uint8Array[] = [];

  const streamPromise = new Promise<Uint8Array>((resolve, reject) => {
    const passthrough = new PassThrough();
    archive.pipe(passthrough);

    passthrough.on('data', (chunk: Uint8Array) => chunks.push(chunk));
    passthrough.on('end', () => {
      const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }
      resolve(result);
    });
    passthrough.on('error', reject);
    archive.on('error', reject);
  });

  // Add JSON manifest
  archive.append(JSON.stringify(data, null, 2), { name: 'devcache-export.json' });

  // Fetch and add files from R2 for file/image items
  const fileItems = data.items.filter((item) =>
    (item.type === 'file' || item.type === 'image') && item.fileUrl
  );

  const publicUrl = process.env.R2_PUBLIC_URL;
  let safePrefix: string | null = null;
  if (publicUrl) {
    try {
      const expectedUrl = new URL(publicUrl);
      safePrefix = expectedUrl.href.endsWith('/') ? expectedUrl.href : `${expectedUrl.href}/`;
    } catch {
      // invalid URL in env
    }
  }

  for (const item of fileItems) {
    try {
      // SSRF Prevention: Fail closed if misconfigured, validate URL
      if (!safePrefix) continue;
      const targetUrl = new URL(item.fileUrl!);
      if (!targetUrl.href.startsWith(safePrefix)) {
        continue;
      }

      const response = await fetch(targetUrl.href);
      if (response.ok && response.body) {
        const arrayBuffer = await response.arrayBuffer();
        const fileName = item.fileName || `file-${fileItems.indexOf(item)}`;
        archive.append(Buffer.from(arrayBuffer), { name: `files/${fileName}` });
      }
    } catch {
      // Skip files that can't be fetched
    }
  }

  await archive.finalize();
  const zipBytes = await streamPromise;

  return new Response(zipBytes.buffer as ArrayBuffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="devcache-export-${dateStr}.zip"`,
    },
  });
}
