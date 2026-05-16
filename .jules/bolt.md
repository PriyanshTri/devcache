## 2024-05-24 - Prisma groupBy over count
**Learning:** For database performance, if you need multiple counts over the same dataset (e.g. total items and favorite items), doing 4 separate `prisma.item.count` and `prisma.collection.count` calls results in 4 database roundtrips.
**Action:** Use `prisma.item.groupBy` on the relevant distinguishing boolean field (like `isFavorite`) to calculate aggregates in a single roundtrip, halving database latency.
