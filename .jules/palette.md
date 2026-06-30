## 2024-06-30 - Dynamic ARIA Labels for Stateful Buttons
**Learning:** Stateful icon-only action buttons (like copy buttons) need to dynamically update both their `aria-label` and `title` attributes to reflect their current status (e.g., from 'Copy item content' to 'Copied'). This pattern is present in the `ItemCard` component.
**Action:** Always verify that interactive, stateful icon-only elements dynamically update their accessibility attributes in addition to their visual icons.
