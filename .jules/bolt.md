## 2024-07-02 - Batch Data Fetching
**Learning:** Sequential queries in page-level components (e.g., fetching a user, then stats, then layout data) create waterfall delays. Grouping queries that depend on the `userId` into a single `Promise.all` is highly effective if `userId` is available via `session` context.
**Action:** Batch page-level database queries and shared component data fetches that only depend on session data into a single `Promise.all` whenever possible to eliminate sequential waterfalls.
