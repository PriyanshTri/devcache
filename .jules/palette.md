## 2024-06-13 - Missing ARIA labels on structural icon-only buttons
**Learning:** The layout components (Sidebar, Top Bar) use icon-only buttons for critical actions (toggle sidebar, mobile menu, search, etc) but are missing `aria-label`s, rendering them inaccessible to screen readers.
**Action:** Always add explicit `aria-label` or `title` to icon-only components like `Button` and `Link` acting as buttons, especially for layout navigation.
