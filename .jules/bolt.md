## 2024-05-24 - Initial Learnings
**Learning:** Initializing bolt journal to document codebase-specific performance learnings.
**Action:** Always measure first before applying optimizations.

## 2024-05-24 - Database aggregate calculations
**Learning:** In the codebase, `getItemTypesWithCounts` only aggregates counts for system item types (`isSystem: true`). To retrieve the true total count of all items (including user-created or non-system types), a separate `prisma.item.count` query must be used; it cannot be safely derived purely by reducing the results of `getItemTypesWithCounts`.
**Action:** Always maintain a separate query for true total counts if system types might not cover all items, but conditional aggregation with `groupBy` can be used to combine `isFavorite` and total counts for the same model.

## 2024-05-24 - Prisma groupBy with boolean condition
**Learning:** Prefer using a single Prisma `groupBy` query over multiple individual `count` queries when performing conditional aggregations (e.g., counting totals vs. favorites). This reduces unnecessary database roundtrips and improves latency.
**Action:** Refactor multiple `count` queries (like `getDashboardStats`) into `groupBy` where appropriate.
## 2024-05-24 - GroupBy with `_count` readability vs performance
**Learning:** While `prisma.*.groupBy` can reduce database roundtrips compared to multiple `.count()` queries, extracting the counts using `_count` results in complex and unreadable logic (e.g., using `typeof` checks and type assertions) due to Prisma's typing mismatch. This trades off readability for a marginal performance gain, which violates the principle of not sacrificing code readability for micro-optimizations, especially since `Promise.all` already batches the queries.
**Action:** Do not use `groupBy` to replace simple `.count()` queries if it requires overly complex data extraction.
