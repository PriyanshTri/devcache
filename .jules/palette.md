## 2025-02-12 - Missing ARIA Labels on Mobile TopBar Actions
**Learning:** The DevCache codebase relies heavily on icon-only buttons within its structural layout components (e.g., top bar and sidebar). Often these are hidden on desktop but visible on mobile, which means mobile screen reader users are left with unlabelled buttons if aria-label is not explicitly provided.
**Action:** Always inspect structural layout components for icon-only mobile navigation buttons and ensure they have appropriate aria-labels applied so critical paths are accessible.
