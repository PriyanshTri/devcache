## 2024-05-23 - Dynamic attributes for stateful action buttons
**Learning:** Stateful icon-only action buttons (e.g., copy) require dynamic `aria-label` and `title` attributes that update according to their state to provide necessary feedback for screen readers and sighted users alike.
**Action:** Always verify that components with a transition in state update their descriptive attributes (e.g. from "Copy item content" to "Copied").
