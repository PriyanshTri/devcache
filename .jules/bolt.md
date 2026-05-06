## 2025-04-13 - [Search Provider Initial Load]
**Learning:** The SearchProvider component unconditionally fetches all search data on mount using `useEffect`, which makes an API request to `getSearchData()`. The search modal is generally hidden (`isOpen` is false) initially, but the API request block main thread/bandwidth. This search data is probably not needed until the user intends to use the search modal (e.g. by pressing Cmd+K or clicking search).
**Action:** We can defer the `fetchSearchData` call until the user actually interacts with search (or lazily when `isOpen` becomes true).

## 2023-10-27 - Reduce Database Query Latency via Grouping
**Learning:** In Prisma and SQL, executing four separate `.count()` aggregations results in four round trips to the database, which increases query latency—especially when computing totals vs conditionally filtered subsets (like `isFavorite=true`) for the same table.
**Action:** Always prefer computing combined aggregates in a single scan. Replacing individual `.count()` queries with a single `.groupBy()` query allows resolving total count and subset counts in one roundtrip.
## 2025-06-15 - Batching sequential database queries in Next.js Server Actions
**Learning:** Sequential, independent database queries inside Next.js server actions (like `findMany` and `groupBy` in `getItemTypesWithCounts`) create unnecessary latency waterfalls, especially since each query requires a separate roundtrip. While simple `count` queries were previously optimized to `groupBy`, remaining independent queries were still running back-to-back.
**Action:** When working with multiple independent Prisma queries in server code, always use `Promise.all` to batch them. This leverages Prisma's ability to execute them concurrently and significantly reduces total TTFB (Time To First Byte).
