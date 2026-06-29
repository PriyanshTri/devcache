## 2024-05-24 - Missing ARIA Labels on Layout Icon Buttons
**Learning:** Structural layout components like `top-bar.tsx` heavily use icon-only action buttons (e.g., search, favorites, new item) that lack accessible names, making critical navigation paths invisible to screen reader users.
**Action:** Always verify `aria-label` attributes on icon-only buttons in structural components like top bars and sidebars during accessibility reviews.
