## 2025-04-13 - [Search Provider Initial Load]
**Learning:** The SearchProvider component unconditionally fetches all search data on mount using `useEffect`, which makes an API request to `getSearchData()`. The search modal is generally hidden (`isOpen` is false) initially, but the API request block main thread/bandwidth. This search data is probably not needed until the user intends to use the search modal (e.g. by pressing Cmd+K or clicking search).
**Action:** We can defer the `fetchSearchData` call until the user actually interacts with search (or lazily when `isOpen` becomes true).

## 2023-10-27 - Reduce Database Query Latency via Grouping
**Learning:** In Prisma and SQL, executing four separate `.count()` aggregations results in four round trips to the database, which increases query latency—especially when computing totals vs conditionally filtered subsets (like `isFavorite=true`) for the same table.
**Action:** Always prefer computing combined aggregates in a single scan. Replacing individual `.count()` queries with a single `.groupBy()` query allows resolving total count and subset counts in one roundtrip.
## 2024-05-04 - [Performance Optimization] Batch Prisma DB Queries

**Learning:** When fetching multiple independent aggregates (like counts) alongside structured nested data in Server Components, the previous sequential execution created a query waterfall resulting in higher DB latency. Furthermore, the manual `groupBy` to calculate item type breakdown was entirely redundant since `getItemTypesWithCounts` internalizes the exact same calculation and formatting.
**Action:** When gathering independent dashboard stats or profiles, use `Promise.all` to fetch all independent queries concurrently, and aggressively reuse functions that already encapsulate the same query logic rather than recalculating the exact same aggregates manually.
