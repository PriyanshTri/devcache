## 2024-11-20 - Adding ARIA labels to Trash buttons
**Learning:** In `src/components/items/item-drawer.tsx`, the delete button (with `Trash2` icon) lacked an `aria-label`, preventing screen readers from identifying its purpose. While it is standard practice to add labels to all icon-only buttons, it is easy to miss when the icon itself seems self-explanatory visually.
**Action:** Always search for `lucide-react` icons within `<button>` or `<Button>` elements to verify if an accessible name or label has been provided, especially in dynamic UIs like drawers and sidebars.
