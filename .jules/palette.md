## 2024-05-17 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Found multiple icon-only buttons in layout components like `top-bar.tsx` without `aria-label` attributes. This breaks WCAG 4.1.2 Name, Role, Value since screen readers can't identify the button's purpose without an explicit accessible name.
**Action:** Always verify that buttons containing only an icon `<Menu />`, `<Plus />`, etc. have a descriptive `aria-label` or `title` for accessibility.
