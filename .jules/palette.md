## 2024-05-28 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Structural layout components like the TopBar and Sidebar frequently use icon-only buttons for navigation and essential actions (e.g., search, menu, add new item). These often lack `aria-label`s, masking critical functions from screen reader users. This is a common accessibility trap in Next.js applications using Lucide icons and Shadcn UI components.
**Action:** Always verify structural components and explicitly add `aria-label`s to `size="icon"` buttons.
