## 2023-10-27 - [CRITICAL] Prevent IP Spoofing in Rate Limiting
**Vulnerability:** The application was using the `x-forwarded-for` header to extract the client IP address for rate limiting purposes.
**Learning:** `x-forwarded-for` is easily spoofed by malicious clients adding their own header, allowing them to bypass rate limits unless strictly sanitized by a trusted reverse proxy that strips user-provided values.
**Prevention:** Always rely on headers like `x-real-ip` which are typically set securely by the edge/proxy and not user-controllable.
## 2024-05-18 - [MEDIUM] Fix XSS vulnerability vector in ChaosAnimation
**Vulnerability:** The `ChaosAnimation.tsx` component used `dangerouslySetInnerHTML` to render SVGs from a hardcoded array of strings, creating a potential Cross-Site Scripting (XSS) vulnerability vector if the source data were ever to become dynamic or user-controlled.
**Learning:** `dangerouslySetInnerHTML` is a security risk. In React, static SVG strings should be converted directly into React JSX components instead of using raw HTML injection.
**Prevention:** Avoid `dangerouslySetInnerHTML` entirely whenever possible. Convert raw HTML/SVG strings to JSX elements, ensuring to translate any HTML attributes (like `stroke-width`) into their React camelCase equivalents (like `strokeWidth`).
## 2024-05-18 - Missing Rate Limiting on Sensitive Account Actions
**Vulnerability:** The `/api/auth/delete-account` and `/api/auth/change-password` endpoints lacked rate limiting.
**Learning:** While other auth endpoints (login, register, forgot password) had rate limits, the delete account and change password endpoints were overlooked, allowing potential brute force and abuse by authenticated users.
**Prevention:** Ensure all state-mutating and sensitive endpoints, even authenticated ones, have appropriate rate limits configured in `rateLimitConfigs` and applied in their route handlers.
## 2024-05-18 - [CRITICAL] Prevent Path Traversal in Catch-All Routes
**Vulnerability:** A Next.js catch-all route handler (`src/app/api/download/[...path]/route.ts`) was taking the `path` array from `params` and joining it to reconstruct a file path, then appending it to an external URL (SSRF vector) and checking authorization using `startsWith`.
**Learning:** Even though the endpoint verified the reconstructed path started with `userId/`, the individual path segments were not validated. A malicious user could potentially include `..` to traverse directories before or during the `join('/')` operation or downstream processing, depending on how `startsWith` or the external fetch behaved with normalized paths.
**Prevention:** Always explicitly validate each segment of a user-provided catch-all route array (like `[...path]`) to ensure no segment contains path traversal characters (`..`, `.`, or `/`) before performing any operations or concatenations with it.
