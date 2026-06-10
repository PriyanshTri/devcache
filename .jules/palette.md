## 2024-05-24 - Accessibility improvements for icon-only buttons
**Learning:** The DevCache codebase relies heavily on icon-only buttons and links within its structural layout components (e.g., the top bar and sidebar). These components frequently lack explicit `aria-label`s, masking their critical navigation paths and actions from screen readers.
**Action:** Always thoroughly inspect specific structural components during accessibility reviews to ensure appropriate `aria-label`s are applied to all icon-only buttons and links (e.g., search triggers, mobile menus, add actions, toggles).
