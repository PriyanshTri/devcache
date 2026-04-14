## 2023-10-27 - [CRITICAL] Prevent IP Spoofing in Rate Limiting
**Vulnerability:** The application was using the `x-forwarded-for` header to extract the client IP address for rate limiting purposes.
**Learning:** `x-forwarded-for` is easily spoofed by malicious clients adding their own header, allowing them to bypass rate limits unless strictly sanitized by a trusted reverse proxy that strips user-provided values.
**Prevention:** Always rely on headers like `x-real-ip` which are typically set securely by the edge/proxy and not user-controllable.
