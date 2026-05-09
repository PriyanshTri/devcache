import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

const SYSTEM_ITEM_TYPES_CACHE_KEY = 'system-item-types';

export const getSystemItemTypes = unstable_cache(
  async () => {
    return prisma.itemType.findMany({
      where: { isSystem: true },
    });
  },
  [SYSTEM_ITEM_TYPES_CACHE_KEY],
  { revalidate: 3600, tags: [SYSTEM_ITEM_TYPES_CACHE_KEY] } // cache for 1 hour, or until invalidated
);
