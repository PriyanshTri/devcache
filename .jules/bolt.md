## 2025-07-04 - Remove redundant layout queries in Profile
**Learning:** Layout components passing data as props often results in pages fetching the exact same data again for their own use, leading to duplicate queries and waterfalls (e.g. `getSystemItemTypes` and `groupBy`).
**Action:** Aggressively check if page-level data is already being fetched for the layout, reuse those props/variables, and combine everything into a single `Promise.all` batch.
