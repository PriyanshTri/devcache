## 2024-07-06 - Batch Database Queries

**Learning:** When fetching shared layout data alongside specific page data (e.g., in a dashboard or profile page), executing Prisma `count` queries sequentially or partially batching them with `Promise.all` can create unnecessary waterfalls. Furthermore, some data, like `itemTypesWithCounts`, can often be fully reused for `itemTypeBreakdown` props instead of running overlapping `groupBy` queries.

**Action:** Whenever multiple independent database reads are required, group all of them into a single `Promise.all` batch at the highest possible level in the page component. Replace duplicate or redundant aggregate queries (like `groupBy`) by reusing existing fetched arrays (e.g., mapping over an existing `ItemTypeWithCount[]`).
