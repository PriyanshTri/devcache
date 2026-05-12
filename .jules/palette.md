## 2024-05-12 - Icon-only buttons lack tooltips by default
**Learning:** Many icon-only buttons in the UI component library (like Radix/Lucide combos) do not automatically inherit or generate tooltips or accessible names. We must explicitly set both `aria-label` (for screen readers) and `title` (for sighted users hovering) to make them usable.
**Action:** Always verify that icon-only `button` elements have explicit `aria-label` and `title` attributes during implementation.
