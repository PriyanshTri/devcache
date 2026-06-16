## 2024-05-15 - Initial Check
**Learning:** Checking for standard a11y practices like aria-labels.
**Action:** Need to find missing aria-labels on icon-only buttons.

## 2024-05-15 - Missing Aria Labels
**Learning:** Structural layout components like TopBar and Sidebar contain icon-only buttons without proper aria-labels, potentially masking navigation functionality from screen readers.
**Action:** Adding explicit `aria-label` attributes to these structural navigation controls (e.g. Mobile menu button, mobile search icon, create new button, toggle sidebar button).
