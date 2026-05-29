## 2024-05-31 - Redundant Prisma Query Removal in Profile Page
**Learning:** Sequential, duplicated database queries (e.g., `prisma.item.groupBy` manually in the page body vs `getItemTypesWithCounts` in the shared layout data fetching) cause unnecessary DB load and execution waterfalls.
**Action:** Always check if required data is already being fetched by layout-level functions or shared components before executing redundant Prisma queries for the same data in the page body. Batch independent Prisma queries using `Promise.all` to avoid sequential execution waterfalls.
