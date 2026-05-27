## 2024-05-27 - Icon-only buttons Accessibility
**Learning:** The DevCache codebase relies heavily on icon-only buttons in structural layout components (top bar, sidebar). Missing `aria-label`s mask critical navigation options from screen readers.
**Action:** Always verify structural components like headers and sidebars for missing `aria-label` on icon-only `<Button>` and `<Link>` components when doing a11y reviews.
