## Performance Optimizations Journal

### 2024-XX-XX - Database Query Optimization
**Learning:** Sequential `count` queries in dashboard stats generation (`getDashboardStats`) cause N+1 database roundtrips, slowing down initial dashboard load.
**Action:** Use a single `prisma.item.groupBy` query to compute total and conditional counts in one pass, rather than multiple separate `count` queries.
