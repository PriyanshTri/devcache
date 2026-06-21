## 2024-06-21 - Accessible Icon-only Navigation Elements
**Learning:** Icon-only navigation links (like the favorites button) and collapse/expand controls in core structural layouts like top-bar and sidebar require `aria-label`s to ensure the app's primary navigation functions are accessible to screen reader users, especially when they don't contain any hidden textual content.
**Action:** Always verify `aria-label` presence on `variant="ghost" size="icon"` buttons in structural components (`top-bar`, `sidebar`).
