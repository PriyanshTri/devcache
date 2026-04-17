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

## 2024-05-18 - Path Traversal Bypass in Next.js Catch-All Routes
**Vulnerability:** Path traversal vulnerability in `/api/download/[...path]` route where attackers could bypass the prefix matching (`filePath.startsWith(session.user.id)`) by requesting URLs like `/api/download/{user_id}/../{other_user_id}/{filename}`.
**Learning:** Next.js catch-all routes supply the URL path segments as an array. Merely using `path.join('/')` and checking if it starts with the user's ID string does not provide full protection if path traversal characters (`..`, `.`, `/`) are sent as segments. The backend file server/storage could resolve the path and bypass the intention of the prefix match.
**Prevention:** Explicitly validate each segment inside catch-all route arrays (e.g. `path.some(segment => segment === '..' || segment === '.' || segment.includes('/'))`) before joining the segments or trusting them for access control.
