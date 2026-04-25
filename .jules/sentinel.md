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
## 2026-04-25 - [CRITICAL] Prevent Path Traversal in Catch-All Routes
**Vulnerability:** The `/api/download/[...path]` route handler did not validate the dynamically captured `path` segments. This allowed an attacker to potentially inject directory traversal sequences like `..` to traverse outside the intended directory or access unintended files on R2 storage, even when standard path checking mechanisms appeared sufficient.
**Learning:** Next.js catch-all routes (`[...path]`) automatically decode URL-encoded segments (e.g. `%2e%2e` becomes `..`), bypassing simple URL inspection. If these raw segments are joined and used to access the file system or external resources like R2 without explicitly checking them individually, a path traversal vulnerability may occur.
**Prevention:** Explicitly validate each individual path segment in a catch-all route array. Forbid any segment that is exactly `..`, exactly `.`, or contains a `/`. Always perform this explicit array-level segment validation before joining the paths or using them in file operations.
