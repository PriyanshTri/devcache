## 2024-06-01 - Add ARIA labels to top-bar and sidebar structural buttons
**Learning:** DevCache relies heavily on icon-only buttons in its structural layout components (top bar, sidebar). Critical navigation and actions can be masked from screen readers if these lack `aria-label`s.
**Action:** Always thoroughly inspect top-level structural components (like header and nav menus) to ensure icon-only buttons have descriptive `aria-label` attributes.
