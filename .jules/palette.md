## 2024-05-24 - Dynamic ARIA Labels for Action Buttons
**Learning:** Stateful icon-only action buttons (e.g., copy) must dynamically update both their `aria-label` and `title` attributes to reflect their current status to provide adequate feedback.
**Action:** Always ensure that when the state of an icon-only button changes, both its visual indicator (icon) and semantic descriptions (`aria-label`, `title`) are updated synchronously.
