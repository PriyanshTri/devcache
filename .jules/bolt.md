## 2026-05-31 - Remove redundant queries
**Learning:** The profile page was manually executing `prisma.item.groupBy` and `getSystemItemTypes` to get item type counts, but then immediately called `getItemTypesWithCounts` for the layout, which does the exact same thing.
**Action:** Always check if layout-level data fetching functions already retrieve the required data before adding redundant queries to page bodies.
