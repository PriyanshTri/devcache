## 2024-05-20 - Stateful Icon-Only Button Accessibility
**Learning:** Stateful icon-only buttons in the UI (like copy buttons in cards) lose their context when their state changes if both `aria-label` and `title` aren't dynamically updated to reflect the current status.
**Action:** Always bind both `aria-label` and `title` to the state variable for interactive icon buttons to ensure screen readers and mouse users get accurate feedback (e.g., "Copied" vs "Copy").
