## 2025-04-13 - [Search Provider Initial Load]
**Learning:** The SearchProvider component unconditionally fetches all search data on mount using `useEffect`, which makes an API request to `getSearchData()`. The search modal is generally hidden (`isOpen` is false) initially, but the API request block main thread/bandwidth. This search data is probably not needed until the user intends to use the search modal (e.g. by pressing Cmd+K or clicking search).
**Action:** We can defer the `fetchSearchData` call until the user actually interacts with search (or lazily when `isOpen` becomes true).
## 2025-04-27 - [Optimize Database Aggregations]
**Learning:** Using separate `count` queries for conditional sums (like `total` and `where { favorite: true }`) creates unnecessary roundtrips to the database. By replacing them with a single `groupBy` query on the boolean field (`isFavorite`), we can retrieve all necessary data in one trip and sum it in JavaScript, halving the database latency.
**Action:** Always prefer `groupBy` over multiple `count` queries when you need aggregations grouped by a categorical or boolean column.
