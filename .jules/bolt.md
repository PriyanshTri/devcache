## 2025-04-13 - [Search Provider Initial Load]
**Learning:** The SearchProvider component unconditionally fetches all search data on mount using `useEffect`, which makes an API request to `getSearchData()`. The search modal is generally hidden (`isOpen` is false) initially, but the API request block main thread/bandwidth. This search data is probably not needed until the user intends to use the search modal (e.g. by pressing Cmd+K or clicking search).
**Action:** We can defer the `fetchSearchData` call until the user actually interacts with search (or lazily when `isOpen` becomes true).

## 2023-10-27 - Reduce Database Query Latency via Grouping
**Learning:** In Prisma and SQL, executing four separate `.count()` aggregations results in four round trips to the database, which increases query latency—especially when computing totals vs conditionally filtered subsets (like `isFavorite=true`) for the same table.
**Action:** Always prefer computing combined aggregates in a single scan. Replacing individual `.count()` queries with a single `.groupBy()` query allows resolving total count and subset counts in one roundtrip.

## 2023-10-27 - Calculate Totals in Memory from GroupBy Results
**Learning:** In Next.js server components, extracting a total item count by summing up a previously fetched Prisma `.groupBy()` dataset (e.g. `itemCounts.reduce`) avoids making a redundant `.count()` query. Combined with batching using `Promise.all`, this minimizes database waterfalls.
**Action:** When a `.count()` query is performed immediately following a `.groupBy()` query on the same records, remove the `.count()` and compute the total in-memory via `reduce()` over the grouped totals.
