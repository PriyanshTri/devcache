## 2024-06-18 - Avoid redundant database queries for page-specific layout data
**Learning:** In this architecture, shared layout data (e.g., itemTypesWithCounts) is fetched in individual page bodies. A common anti-pattern is re-executing similar queries (like prisma.item.groupBy for item counts) for page content when the layout data already contains the needed information.
**Action:** Always check if layout data being fetched for the dashboard layout can be reused or aggregated for the page body to eliminate redundant database queries.
