## 2025-04-13 - [Search Provider Initial Load]
**Learning:** The SearchProvider component unconditionally fetches all search data on mount using `useEffect`, which makes an API request to `getSearchData()`. The search modal is generally hidden (`isOpen` is false) initially, but the API request block main thread/bandwidth. This search data is probably not needed until the user intends to use the search modal (e.g. by pressing Cmd+K or clicking search).
**Action:** We can defer the `fetchSearchData` call until the user actually interacts with search (or lazily when `isOpen` becomes true).

## 2023-10-27 - Reduce Database Query Latency via Grouping
**Learning:** In Prisma and SQL, executing four separate `.count()` aggregations results in four round trips to the database, which increases query latency—especially when computing totals vs conditionally filtered subsets (like `isFavorite=true`) for the same table.
**Action:** Always prefer computing combined aggregates in a single scan. Replacing individual `.count()` queries with a single `.groupBy()` query allows resolving total count and subset counts in one roundtrip.

## 2024-05-03 - [Consolidating parallel database requests in Next.js page]
**Learning:** In `src/app/profile/page.tsx`, multiple independent DB queries (`prisma.item.groupBy` and `prisma.itemType.findMany`) were executing redundant operations over items. Reusing `itemTypesWithCounts` (which computes group counts internally) allows removing the redundant `prisma.item.groupBy` and `prisma.itemType.findMany` queries from the top-level execution path while preserving identical output, reducing database load.
**Action:** Always scan for redundant overlapping data structures (such as `itemCounts` grouping vs `getItemTypesWithCounts`) fetched within the same render pass, and deduplicate them to single database roundtrips. Ensure any in-memory transformations correctly mirror the expected output types.
