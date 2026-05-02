## 2024-05-24 - [Open Redirect and XSS via Unvalidated URLs]
**Vulnerability:** User-provided URLs (`item.fileUrl` and `item.url`) were being directly passed to `window.open` and anchor tag `href` attributes without validation, allowing for potential `javascript:`, `vbscript:`, or `data:` URI XSS attacks, as well as open redirects to malicious domains.
**Learning:** React escapes content but does NOT automatically escape `href` or `window.open` target URLs if they contain dangerous protocols.
**Prevention:** Always validate external URLs using an explicit protocol check (e.g., `isValidHttpUrl` from `src/lib/utils/url.ts`) before invoking `window.open` or assigning to `href` attributes to enforce `http:` or `https:` protocols.
