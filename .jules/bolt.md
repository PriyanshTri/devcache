## 2025-04-13 - [Search Provider Initial Load]
**Learning:** The SearchProvider component unconditionally fetches all search data on mount using `useEffect`, which makes an API request to `getSearchData()`. The search modal is generally hidden (`isOpen` is false) initially, but the API request block main thread/bandwidth. This search data is probably not needed until the user intends to use the search modal (e.g. by pressing Cmd+K or clicking search).
**Action:** We can defer the `fetchSearchData` call until the user actually interacts with search (or lazily when `isOpen` becomes true).

## 2023-10-27 - Reduce Database Query Latency via Grouping
**Learning:** In Prisma and SQL, executing four separate `.count()` aggregations results in four round trips to the database, which increases query latency—especially when computing totals vs conditionally filtered subsets (like `isFavorite=true`) for the same table.
**Action:** Always prefer computing combined aggregates in a single scan. Replacing individual `.count()` queries with a single `.groupBy()` query allows resolving total count and subset counts in one roundtrip.

## 2023-10-27 - [Profile Page Redundant Queries]
**Learning:** The profile page was making redundant database queries: `prisma.item.groupBy` and `prisma.itemType.findMany` to build the breakdown, and `prisma.item.count` to calculate total items. All of this data was effectively already being fetched via `getItemTypesWithCounts`. These extra database round trips were slowing down the page rendering unnecessarily.
**Action:** Always verify if already requested data/aggregations can be manipulated in memory via map/reduce to fulfill other stat requirements instead of initiating separate parallel database queries.
