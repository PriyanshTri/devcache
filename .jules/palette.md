## 2024-03-21 - Added aria-labels to structural layout components
**Learning:** The DevCache codebase relies heavily on icon-only buttons and links within its structural layout components (e.g., the top bar and sidebar). These require explicit ARIA labels for accessibility.
**Action:** Always thoroughly inspect these specific structural components during accessibility reviews to ensure appropriate `aria-label`s are applied and critical navigation paths are not masked from screen readers.
