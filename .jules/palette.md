## 2024-05-18 - Structural Layout Buttons Missing ARIA Labels
**Learning:** The `top-bar.tsx` and `sidebar.tsx` layout components rely heavily on icon-only buttons (e.g., mobile menu toggles, search triggers, sidebar collapse buttons) that are structurally important but lack descriptive `aria-label`s, masking key navigation features from screen readers.
**Action:** When performing accessibility reviews, explicitly check major structural layout components for icon-only toggles and triggers to ensure they have appropriate descriptive labels.
