## 2024-05-24 - Dynamic ARIA Labels for Stateful Controls
**Learning:** Stateful icon-only layout controls (like the sidebar toggle) need dynamic `aria-label` and `title` updates that reflect the *action that will occur* (e.g., "Expand sidebar"), not just a static label describing the component.
**Action:** Always verify if an icon-only button is a toggle or stateful component, and use conditional logic to update its descriptive attributes.
