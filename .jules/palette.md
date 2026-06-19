## 2024-06-19 - Structural components missing aria-labels
**Learning:** The structural components like TopBar and Sidebar use multiple icon-only `Button` elements for essential navigation and actions, but they completely lacked `aria-label` attributes, masking critical paths from screen readers.
**Action:** Always thoroughly inspect the structural components (top bar, sidebar) during accessibility reviews, especially for interactive elements without text.
