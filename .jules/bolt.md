## $(date +%Y-%m-%d) - Profile Page Sequential Waterfalls
**Learning:** Profile pages frequently duplicate queries by manually grouping/fetching data that is already resolved by layout-level helper functions, and sequential user auth blocks concurrent data fetching.
**Action:** Group all data fetching operations (including initial user queries using `session.user.id`) into a single `Promise.all` batch whenever possible to maximize concurrency. Always reuse layout-level fetched data objects instead of running overlapping queries.
