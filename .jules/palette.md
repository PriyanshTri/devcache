## 2024-05-26 - Add accessible labels to interactive icon cards
**Learning:** Icon-only action buttons like copy, favorite, pin, and more-options within item and collection cards were missing `aria-label`s, masking their function from screen readers. For stateful buttons, dynamic aria-labels (e.g. changing from "Copy item content" to "Copied") are crucial.
**Action:** Always add dynamic `aria-label` and `title` attributes that reflect the current state on icon-only interactive elements to provide adequate feedback for both screen readers and sighted users.
