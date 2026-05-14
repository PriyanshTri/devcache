## 2024-05-14 - Optimize database aggregations for dashboard stats
**Learning:** Using multiple individual `prisma.count` queries for conditional aggregations (e.g. counting total vs. favorites) results in redundant database roundtrips which can increase latency.
**Action:** Consolidate multiple count queries into a single `prisma.groupBy` query when counting across conditions like `isFavorite`. The grouped results can then be aggregated in-memory to derive total and conditional counts in fewer roundtrips.
