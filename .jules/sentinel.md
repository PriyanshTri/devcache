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
## 2024-04-23 - Path Traversal in Next.js Catch-All Routes
**Vulnerability:** The `/api/download/[...path]` endpoint accepts an array of path segments and concatenates them with `/` to fetch a file from R2. However, it does not validate individual segments to ensure they do not contain `..` or `/`, which could potentially allow path traversal to fetch files outside the user's intended directory, bypassing the `startsWith(session.user.id + '/')` check due to path normalization if not handled correctly.
**Learning:** Next.js catch-all route segments (`[...path]`) decode URL-encoded values. If a user passes `%2e%2e` (which decodes to `..`), it can be joined to form a path like `user-id/../../sensitive-file`.
**Prevention:** Always explicitly validate each segment of a catch-all route to reject segments containing `..`, `/`, or exactly `.` before processing or concatenating them.
