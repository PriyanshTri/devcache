## 2024-06-12 - Redundant Database Queries
**Learning:** In a Next.js App Router application, multiple components/sections within a page (e.g., layout and main content) might require the same or similar data. If these are fetched independently using distinct database calls inside the same Server Component, it leads to redundant queries.
**Action:** Always verify if data fetched for a page body can be derived from or reused by the data already being fetched for the layout or shared components within the same Server Component to prevent redundant queries.
