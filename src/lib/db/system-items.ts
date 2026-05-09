import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export const getSystemItemTypes = unstable_cache(
  async () => {
    return prisma.itemType.findMany({
      where: { isSystem: true },
    });
  },
  ['system-item-types'],
  { revalidate: 3600, tags: ['system-item-types'] } // cache for 1 hour, or until invalidated
);
