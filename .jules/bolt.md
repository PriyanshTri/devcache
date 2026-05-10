## 2024-06-25 - Replace multiple count queries with single groupBy
**Learning:** When needing to calculate multiple conditional counts for the same model (e.g. total items and favorite items), making multiple separate `prisma.model.count()` queries incurs unnecessary database roundtrips and slows down performance.
**Action:** Use a single `prisma.model.groupBy` query to group the counts (e.g. `by: ['isFavorite']`) to compute totals and conditional subsets in memory from a single query.
