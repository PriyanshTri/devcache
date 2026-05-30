## 2024-05-30 - Remove redundant DB queries
**Learning:** Check if required data is already being fetched by layout-level functions or shared components before executing redundant Prisma queries for the same data in the page body.
**Action:** Combine and reuse queries to prevent N+1 and duplicate queries.
