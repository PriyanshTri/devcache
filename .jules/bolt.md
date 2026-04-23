## 2025-04-13 - [Search Provider Initial Load]
**Learning:** The SearchProvider component unconditionally fetches all search data on mount using `useEffect`, which makes an API request to `getSearchData()`. The search modal is generally hidden (`isOpen` is false) initially, but the API request block main thread/bandwidth. This search data is probably not needed until the user intends to use the search modal (e.g. by pressing Cmd+K or clicking search).
**Action:** We can defer the `fetchSearchData` call until the user actually interacts with search (or lazily when `isOpen` becomes true).

## 2025-04-23 - [Redundant Database Queries & Waterfalls in Server Components]
**Learning:** Found critical performance bottlenecks where page load times degrade due to duplicate and sequential Prisma queries. Specifically, `profile/page.tsx` manually repeated `item.groupBy` and `itemType.findMany` operations that were already covered by the utility `getItemTypesWithCounts(user.id)`, while the utility itself executed queries sequentially instead of concurrently.
**Action:** Always verify if a required utility already fetches the necessary data to prevent redundant requests. Always inspect utilities to execute independent database calls (like fetching dimension tables and calculating group aggregations) concurrently using `Promise.all` to avoid database request waterfalls.
