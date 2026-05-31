## 2024-05-18 - Missing ARIA labels in layout structural components
**Learning:** Structural layout components like `top-bar.tsx` and `sidebar.tsx` rely heavily on icon-only buttons for mobile optimization, increasing the risk of screen reader accessibility gaps.
**Action:** Always inspect main navigation and layout structural components for unlabeled interactive elements, particularly elements conditionally rendered or styled only for mobile views (`sm:hidden`).
