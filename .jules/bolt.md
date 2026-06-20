## 2024-06-20 - Prevent redundant layout data queries in page bodies
**Learning:** Found redundant Prisma `groupBy` queries for item types in `src/app/profile/page.tsx` that duplicated data already fetched by layout-level shared functions (`getItemTypesWithCounts`) in the same file.
**Action:** Always check if required data is already being fetched by layout-level functions or shared components before executing redundant queries for the same data in the page body. Group data fetching in a single `Promise.all` batch whenever possible.
