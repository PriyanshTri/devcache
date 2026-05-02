## 2025-04-13 - [Search Provider Initial Load]
**Learning:** The SearchProvider component unconditionally fetches all search data on mount using `useEffect`, which makes an API request to `getSearchData()`. The search modal is generally hidden (`isOpen` is false) initially, but the API request block main thread/bandwidth. This search data is probably not needed until the user intends to use the search modal (e.g. by pressing Cmd+K or clicking search).
**Action:** We can defer the `fetchSearchData` call until the user actually interacts with search (or lazily when `isOpen` becomes true).

## 2023-10-27 - Reduce Database Query Latency via Grouping
**Learning:** In Prisma and SQL, executing four separate `.count()` aggregations results in four round trips to the database, which increases query latency—especially when computing totals vs conditionally filtered subsets (like `isFavorite=true`) for the same table.
**Action:** Always prefer computing combined aggregates in a single scan. Replacing individual `.count()` queries with a single `.groupBy()` query allows resolving total count and subset counts in one roundtrip.

## 2024-05-02 - Redundant Aggregation Queries in Next.js Profile Page
**Learning:** In server components fetching dashboard or profile data, performing separate Prisma `count` or `groupBy` queries individually can introduce redundant database roundtrips that delay the initial page load time.
**Action:** When calculating dashboard totals or gathering aggregation metadata alongside item types, use `Promise.all` to batch the Prisma queries. Specifically, use a single `Promise.all` block to fetch total item and collection counts simultaneously with `getItemTypesWithCounts(user.id)`. This removes individual `await` bottlenecks and reduces unnecessary duplication of aggregation queries when an existing helper is already fetching the necessary statistics.
