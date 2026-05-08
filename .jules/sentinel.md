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
## 2024-05-24 - [SSRF & Path Traversal Mitigations]
**Vulnerability:** Found missing SSRF protection in file fetching during zip export (`src/app/api/export/route.ts`) and potential Path Traversal through the catch-all parameter in file downloads (`src/app/api/download/[...path]/route.ts`).
**Learning:** Even though URLs and paths are generated internally, user input or database manipulation could result in external/malicious URLs being fetched (SSRF), or directory structures being compromised during resolving.
**Prevention:** Always validate URLs against expected domain/prefix before fetching on the server. Always sanitize path segments from catch-all dynamic routes before concatenating or processing them.
## 2024-05-24 - [CRITICAL] Prevent Brute-Force Bypasses in NextAuth Login
**Vulnerability:** The application was missing server-side rate limiting within the NextAuth `authorize` callback. Relying solely on client-side route checks (`/api/auth/check-login-limit`) allows attackers to bypass the check by calling the NextAuth credentials endpoint directly via POST.
**Learning:** Client-side rate limits and pre-checks are insufficient for security and only provide UX feedback. Authentication endpoints like NextAuth's `authorize` callback must enforce their own server-side rate limits to prevent brute-force attacks.
**Prevention:** Always enforce login rate limiting server-side within the NextAuth `authorize` callback. In Next.js App Router, use `checkRateLimit` which leverages `next/headers` to accurately identify client IPs. Custom errors should extend `CredentialsSignin` to properly propagate error codes to the client.
