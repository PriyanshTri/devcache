## 2024-05-30 - Optimize conditional aggregations
**Learning:** Prisma `groupBy` can be used to aggregate data based on conditions (e.g. `isFavorite: true` or `false`) in a single query, which reduces the need for multiple roundtrips using `count()`.
**Action:** When calculating statistics that slice a single table by an enum or boolean status, use `groupBy` instead of separate `.count()` calls to parallelize data retrieval and reduce latency.
