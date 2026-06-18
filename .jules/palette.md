## 2024-06-18 - Missing ARIA Labels on Core Layout Elements
**Learning:** The project relies heavily on structural icon-only elements (like the sidebar toggle button and top bar buttons), many of which are completely inaccessible to screen readers because they omit `aria-label`.
**Action:** Always thoroughly inspect core structural layout components (`top-bar.tsx`, `sidebar.tsx`) to ensure basic keyboard and screen reader accessibility are established, especially for global actions.

## 2024-06-18 - Missing Dynamic ARIA Labels on Stateful Buttons
**Learning:** Stateful icon-only buttons (like copy buttons) need to dynamically update their `aria-label` and `title` to provide accurate context depending on their current state.
**Action:** Ensure stateful icon-only action buttons dynamically update their `aria-label` and `title` attributes (e.g., 'Copy item content' -> 'Copied') to reflect current state.
