## 2024-06-27 - Added ARIA labels to core layout components
**Learning:** The DevCache codebase relies heavily on icon-only buttons and links within its structural layout components (e.g., the top bar and sidebar), but these frequently lack necessary `aria-label`s, masking critical navigation paths from screen readers.
**Action:** Always thoroughly inspect specific structural layout components during accessibility reviews to ensure appropriate `aria-label`s are applied to all interactive, purely visual elements.
