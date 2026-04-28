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
**Vulnerability:** The `/api/download/[...path]` route handler took the raw `path` array segments from Next.js and immediately joined them with `/` without validation. Attackers could submit encoded paths like `user123/%2e%2e/other/secret` which would be decoded to `user123/../other/secret`, allowing them to bypass the `filePath.startsWith(userId + '/')` check after `path.join('/')` simplifies the string, leading to path traversal reading unauthorized users' files.
**Learning:** Next.js catch-all routes decode URL-encoded segments (like `%2e%2e` to `..`). String prefix checks like `startsWith` are insufficient after segments have been joined without resolving dots because `user123/../` technically "starts with" `user123/` as a string but points to a different logical directory.
**Prevention:** Explicitly validate each path segment in the catch-all array *before* processing or joining. Ensure no segment contains `..` or `/`, and no segment is exactly `.` (while allowing `.` inside strings for file extensions).
