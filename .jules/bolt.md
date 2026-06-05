## 2024-06-05 - Consolidate redundant queries in layout/page structure
**Learning:** In Next.js App Router applications, pages and layouts often independently request the same aggregated data (e.g., sidebar counts vs page body stats), resulting in duplicate database queries and waterfall execution if not carefully managed.
**Action:** When a page needs data that is also required by its layout wrapper, reuse the layout's data fetching result (via shared promises or prop drilling) and batch independent queries into a single `Promise.all` to minimize waterfalls and duplicate database load.
