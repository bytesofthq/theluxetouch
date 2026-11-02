# Security Architecture & Safeguards: The Luxe Touch

## 1. Principles of Security

Security for **The Luxe Touch** is structured around zero-trust administrative boundaries, defence-in-depth, strict isolation of secrets, and comprehensive input sanitisation.

---

## 2. Authentication & Authorization

1. **Authentication Framework:**
   - **Better Auth** with the native MongoDB adapter.
   - Sessions are bound to HTTP-only, `SameSite=Lax` (or `Strict`), cryptographically signed session cookies.
   - No public user registration endpoint. Only an initial owner setup script or existing authorized administrators can invite or provision new managers.
2. **Server-Side Authorization Checks:**
   - Client-side navigation guards are strictly cosmetic. Every Server Action and Route Handler inside `/admin` independently verifies the session token using `auth.api.getSession`.
   - Distinct role capabilities: `owner`, `admin`, `booking_manager`, `content_manager`.

---

## 3. Secret Management & Environment Security

1. **Isolation of Secrets:**
   - Environment variables such as `MONGODB_URI`, `CLOUDINARY_API_SECRET`, and `BETTER_AUTH_SECRET` are strictly server-only.
   - Client-side variables are limited to `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
   - `.env.local` is never committed to Git (confirmed in `.gitignore`).
   - Logging utilities explicitly filter and mask any configuration objects.
2. **Safe Image Uploads:**
   - Uploads to Cloudinary use short-lived server-signed parameters (`timestamp`, `signature`, `folder`).
   - The client never receives the Cloudinary API secret.
   - Max file size limits (5 MB) and MIME-type restrictions (`image/jpeg`, `image/png`, `image/webp`).

---

## 4. Input Sanitisation & Data Validation

1. **Zod Validation Everywhere:**
   - Every user-facing form (Booking Enquiry, Contact Form) and administrative form (Service CRUD, Content CMS, Settings) is validated against strict Zod schemas on both client and server before database writes.
2. **Protection Against Mass Assignment:**
   - Server Actions explicitly extract allowed fields rather than forwarding raw request payloads into Mongoose `create()` or `updateOne()`.
3. **NoSQL Injection Defences:**
   - Parameterised Mongoose queries with strict schema casting prevent object injection attacks.
4. **Rate Limiting & Anti-Spam:**
   - In-memory rate limiting applied to public booking enquiry and contact form submissions to prevent abuse.
   - Honeypot fields embedded in public forms to silently drop bot submissions.

---

## 5. Audit Logging

- High-impact operational changes (booking status transitions, service deletions, user role modifications, and global settings updates) trigger synchronous entries into the `auditLogs` collection with user ID, timestamp, target entity, and diff metadata.

