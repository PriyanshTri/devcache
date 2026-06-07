## 2024-05-20 - Ensure structural navigation elements have aria-labels
**Learning:** The DevCache codebase relies heavily on icon-only buttons and links within its structural layout components (e.g., the top bar and sidebar). These can easily lack accessible names.
**Action:** Always thoroughly inspect these specific structural components during accessibility reviews to ensure appropriate `aria-label`s are applied and critical navigation paths are not masked from screen readers.
