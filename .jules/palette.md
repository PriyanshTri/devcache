## $(date +%Y-%m-%d) - Add accessibility labels to structural navigation icons
**Learning:** The DevCache codebase relies heavily on icon-only buttons within its structural layout components (e.g., top-bar, sidebar). These mask critical navigation and search functions from screen readers if left unlabeled.
**Action:** Always inspect structural components during accessibility reviews and ensure icon-only buttons receive descriptive aria-labels (and titles if stateful).
