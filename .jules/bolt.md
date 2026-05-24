## 2024-05-24 - Batch database queries and avoid redundant data fetching
**Learning:** The profile page was making redundant sequential database queries for item counts and types, and then recreating the same breakdown data that the layout data function `getItemTypesWithCounts` already provided.
**Action:** When gathering data for a page, look at the layout requirements and see if the same data can be reused for the page components. Always batch independent DB queries with `Promise.all` instead of executing them sequentially.
