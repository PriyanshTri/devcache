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
## 2025-03-01 - Prevented SSRF in Export Functionality
**Vulnerability:** The export functionality `src/app/api/export/route.ts` passed an unvalidated, user-controlled URL (`item.fileUrl`) directly to a server-side `fetch()` call. This allowed Server-Side Request Forgery (SSRF), where an attacker could theoretically make the server send GET requests to arbitrary internal endpoints or unintended external services.
**Learning:** Using `fetch()` on an unchecked value stored in the database is dangerous. When writing security checks like `startsWith`, it's critical to "fail closed" if configuration like `R2_PUBLIC_URL` is missing, and to append trailing slashes (e.g., `https://mybucket.com/`) to prevent prefix bypasses (e.g., matching `https://mybucket.com.attacker.com`).
**Prevention:** Always validate URLs against expected schemas, hosts, or strict path prefixes before passing them to server-side request functions like `fetch`. Avoid using `startsWith()` with bare hostnames; use URL parsing, trailing slashes, or exact domain matching.
