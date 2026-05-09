## 2024-06-25 - GroupBy over Count for Boolean Aggregations
**Learning:** In Prisma, calculating total counts and conditional counts (like favorites) independently using `prisma.count` creates redundant database roundtrips that cannot be batched effectively at the database level.
**Action:** When deriving aggregate statistics over the same table (e.g., total items vs favorite items), prefer using a single `prisma.groupBy` query over boolean fields and calculating the final numbers in memory.
