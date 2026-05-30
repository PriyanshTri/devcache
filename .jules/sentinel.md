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
**Vulnerability:** The Next.js catch-all route at `/api/download/[...path]/route.ts` did not validate path segments. An attacker could pass `..` to traverse directories, which bypasses the simple `filePath.startsWith(userId + '/')` string check, enabling them to fetch other users' files from the backend storage.
**Learning:** Checking if a concatenated path starts with a string prefix is insufficient because path resolution logic (like URL generation or `fetch()`) will collapse `..` segments, neutralizing the intended prefix check.
**Prevention:** In Next.js catch-all routes like `[...path]`, always explicitly validate that no path segments contain `..` or `/`, or are exactly `.` before processing or concatenating them.
## 2024-05-18 - [CRITICAL] Prevent SSRF in Server-Side Fetch
**Vulnerability:** The `/api/export/route.ts` endpoint used an unvalidated `item.fileUrl` property from the database directly in a server-side `fetch()` call. This could lead to a Server-Side Request Forgery (SSRF) vulnerability if an attacker manages to inject a malicious URL into `fileUrl`.
**Learning:** Never trust URLs stored in the database for server-side fetches without validation, even if they nominally represent internal or storage endpoints.
**Prevention:** Always validate external URLs against expected prefixes (e.g., `process.env.R2_PUBLIC_URL`) before executing server-side fetches. Ensure the check 'fails closed' if the configuration is missing, and explicitly append a trailing slash to the prefix before checking `.startsWith()` to prevent domain extension bypasses (e.g., `.attacker.com`).
