## 2024-05-18 - Missing ARIA Labels on Icon-only Action Buttons
**Learning:** Structural layout components like the `TopBar` and `Sidebar` use multiple icon-only `Button` elements (e.g. mobile menu, search trigger, favorite toggle, create new drop down, sidebar collapse/expand toggle) without `aria-label` attributes. This completely masks their functionality from screen readers.
**Action:** Always add descriptive `aria-label`s to icon-only interactive elements to ensure accessibility, especially in core navigation components.
