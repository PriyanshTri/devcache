## 2024-06-06 - Remove redundant database queries
**Learning:** Page bodies sometimes execute complex and redundant Prisma queries (e.g., `groupBy`) to fetch data that is already being requested by layout-level functions or shared components (like `getItemTypesWithCounts`) on the same page.
**Action:** Always check if required data is already being fetched by layout-level functions or shared components before executing redundant Prisma queries in the page body.
