## 2025-05-19 - Optimizing Count Queries in Prisma
**Learning:** In Prisma, using `groupBy` with `_count: true` can result in complex objects. When running parallel queries to fetch both data and counts, it is better to perform an explicit `.count()` query on the exact subset if we just need an overall count.
**Action:** When a `.count()` is performed alongside `findMany()`, prefer `Promise.all` batched explicit `.count()` rather than trying to group. Also ensure to use `.count()` efficiently and cleanly.
## 2025-05-19 - Deferring Search Data Fetching
**Learning:** `SearchProvider` fetches all searchable items and collections immediately on mount (`useEffect` fetching `getSearchData`). If a user never presses Cmd+K, this is a wasted expensive API call and database query.
**Action:** Defer data fetching until the Command Palette is actually opened (`isOpen === true`).
