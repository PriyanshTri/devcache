## 2024-05-18 - Optimize aggregate dashboard stats queries
**Learning:** Querying `.count()` individually for different boolean conditions (like `isFavorite`) creates sequential execution waterfalls (even with `Promise.all` creating concurrent connections) that increases roundtrips to the DB.
**Action:** Instead, prefer using a single `.groupBy` with `_count: { id: true }` and calculating the total aggregations and subsets in memory to halve the number of queries for data fetching functions like `getDashboardStats`.
