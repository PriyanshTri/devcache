## $(date +%Y-%m-%d) - Accessible Icon-Only Sidebar Toggle
**Learning:** Icon-only buttons used for critical layout navigation (like collapsing the sidebar) are entirely opaque to screen readers if they lack `aria-label`s. Furthermore, the label must dynamically update to reflect the action the button will perform in its current state (e.g., "Expand" vs "Collapse").
**Action:** Always ensure icon-only stateful toggle buttons dynamically update both their `aria-label` and `title` attributes based on the component's state to provide clear context for screen reader and mouse users.
