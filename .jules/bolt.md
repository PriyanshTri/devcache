## 2025-04-13 - [Search Provider Initial Load]
**Learning:** The SearchProvider component unconditionally fetches all search data on mount using `useEffect`, which makes an API request to `getSearchData()`. The search modal is generally hidden (`isOpen` is false) initially, but the API request block main thread/bandwidth. This search data is probably not needed until the user intends to use the search modal (e.g. by pressing Cmd+K or clicking search).
**Action:** We can defer the `fetchSearchData` call until the user actually interacts with search (or lazily when `isOpen` becomes true).

## 2025-04-14 - [Database Query Optimization]
**Learning:** Pulling large nested relations (`items.take: 50`) for the sole purpose of computing a derivative UI property (like dominant color) creates unnecessary database load and bloats query payload.
**Action:** Restrict the sample size to the minimum needed (e.g. 5) to compute UI derivatives without degrading UX.
