## 2024-05-24 - SSRF in Export Route
**Vulnerability:** Server-Side Request Forgery (SSRF) in `src/app/api/export/route.ts` because it blindly fetches `item.fileUrl` without validating it against `process.env.R2_PUBLIC_URL`.
**Learning:** Even though `item.fileUrl` is populated from our database, an attacker might find a way to inject a malicious URL or there might be an IDOR/pollution vulnerability elsewhere. We should always validate URLs before fetching them server-side.
**Prevention:** Validate that the URL starts with the expected prefix (`process.env.R2_PUBLIC_URL`) and parse it properly to prevent bypasses.
