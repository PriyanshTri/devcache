## 2024-06-12 - Prevent SSRF in Data Export
**Vulnerability:** Server-Side Request Forgery (SSRF) in the data export route (`/api/export`) where `fetch` was called on user-controlled `item.fileUrl` without validation.
**Learning:** Even if data is fetched from the database, if the initial creation allowed arbitrary URLs, or if the database is otherwise manipulated, using unvalidated URLs in server-side `fetch` can expose internal network resources (like AWS metadata) to attackers via the exported ZIP file.
**Prevention:** Always validate external URLs against an expected prefix (e.g., `process.env.R2_PUBLIC_URL`) before calling `fetch` on the server-side, ensuring you fail closed and explicitly append a trailing slash to the prefix to prevent domain extension bypasses.
