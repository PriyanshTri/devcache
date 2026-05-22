## 2024-05-24 - Batch Independent Database Queries
**Learning:** Sequential execution of independent database queries causes a latency waterfall, and duplicate query logic leads to unnecessary database hits.
**Action:** When deriving aggregate data and counts in server components, combine all independent Prisma calls into a single `Promise.all` and reuse pre-aggregated helper functions (e.g., `getItemTypesWithCounts`) rather than recalculating them manually.
