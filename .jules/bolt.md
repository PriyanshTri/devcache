## 2024-06-22 - Optimize profile page data fetching
**Learning:** Shared layout data (like `getItemTypesWithCounts`) is frequently fetched in the same `page.tsx` as page-specific data. Running separate redundant Prisma queries for the exact same data before the main `Promise.all` causes unnecessary database load and waterfall requests.
**Action:** Always check if layout data (e.g., `itemTypes`) already contains the data needed for the page body, and group all data fetching into a single page-level `Promise.all` to eliminate redundant queries and maximize concurrency.
