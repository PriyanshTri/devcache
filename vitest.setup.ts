import { vi } from 'vitest';

vi.mock('next/cache', () => ({
  unstable_cache: (cb: unknown) => cb,
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));
