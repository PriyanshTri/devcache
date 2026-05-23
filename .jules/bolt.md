## 2024-05-24 - Batch independent queries to avoid waterfalls
**Learning:** Sequential Prisma queries and cached function calls in server components (like sequential `await Promise.all(...)` blocks) create unnecessary database waterfalls.
**Action:** Always group independent Prisma queries and cached function calls into a single `Promise.all` to minimize database roundtrips and improve loading performance.
