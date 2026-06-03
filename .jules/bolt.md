## 2024-05-23 - Batch Data Fetching in Profile Page
**Learning:** The Profile page was executing redundant queries to get item types and counts for the page body (`prisma.item.groupBy` and `getSystemItemTypes`), while the same data was also fetched for the layout via `getItemTypesWithCounts`.
**Action:** Before executing Prisma queries for page body data, always check if the same data is already being fetched by layout-level functions or shared components to reuse it.
