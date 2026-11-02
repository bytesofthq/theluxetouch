# System Architecture: The Luxe Touch

## 1. Architectural Philosophy

The application is architected as a **unified Next.js 15 (App Router)** solution, leveraging modern Server Components for public search engine visibility and sub-second initial loads, coupled with React Server Actions and Route Handlers for high-integrity mutations.

```
                           +----------------------------------------+
                           |           Client / Browser             |
                           +-------------------+--------------------+
                                               |
                     HTTPS Requests / RSC      | Server Actions / JSON
                                               v
+------------------------------------------------------------------------------------+
|                                Next.js 15 App Router                               |
|                                                                                    |
|  +---------------------------+  +---------------------------+  +-----------------+ |
|  |     (website) Routes      |  |       /admin Routes       |  |  /api Handlers  | |
|  |                           |  |                           |  |                 | |
|  |  - Home (/)               |  |  - Overview (/admin)      |  |  - Better Auth  | |
|  |  - Services (/services)   |  |  - Bookings (/admin/...)  |  |  - Cloudinary   | |
|  |  - Service (/services/[s])|  |  - Services (/admin/...)  |  |  - Webhooks     | |
|  |  - Gallery (/gallery)     |  |  - Gallery (/admin/...)   |  +-----------------+ |
|  |  - About (/about)         |  |  - Content (/admin/...)   |                      |
|  |  - Book (/book)           |  |  - Settings (/admin/...)  |                      |
|  |  - Contact (/contact)     |  +---------------------------+                      |
|  +---------------------------+                                                     |
|                                                                                    |
|  +-------------------------------------------------------------------------------+ |
|  |                            Business Logic & Actions                           | |
|  |   - Bookings Engine    - Services Engine     - CMS / Content Engine           | |
|  |   - Image Management   - Auth & Session Guard- Notifications / WhatsApp       | |
|  +-------------------------------------------------------------------------------+ |
+------------------------------------------------------------------------------------+
              |                                     |                         |
              v                                     v                         v
   +----------------------+               +-------------------+     +------------------+
   |    MongoDB Atlas     |               |  Cloudinary CDN   |     | WhatsApp Web API |
   |  (Database:          |               | (Media Storage)   |     | (Concierge Chat) |
   |   `theluxetouch`)    |               +-------------------+     +------------------+
   +----------------------+
```

---

## 2. Directory Structure

```text
src/
├── app/
│   ├── (website)/                  # Public Client Experience
│   │   ├── layout.tsx              # Public luxury header, footer, concierge widget
│   │   ├── page.tsx                # Homepage (Stitch layout)
│   │   ├── about/page.tsx          # Brand story & aesthetician profile
│   │   ├── services/
│   │   │   ├── page.tsx            # Full service catalog
│   │   │   └── [slug]/page.tsx     # Dynamic individual service detail
│   │   ├── gallery/page.tsx        # Filterable lookbook & lightbox
│   │   ├── book/page.tsx           # Booking enquiry form
│   │   ├── contact/page.tsx        # Concierge contact & coverage map
│   │   ├── privacy-policy/page.tsx # Legal
│   │   └── terms/page.tsx          # Legal
│   ├── admin/                      # Protected Administration Portal
│   │   ├── layout.tsx              # Admin shell (Sidebar + Sticky Header + Auth check)
│   │   ├── page.tsx                # Overview Dashboard
│   │   ├── login/page.tsx          # Admin Login screen
│   │   ├── bookings/page.tsx       # Bookings ledger & Slide-over drawer
│   │   ├── services/page.tsx       # Services & Category manager
│   │   ├── gallery/page.tsx        # Media uploader & Lookbook organizer
│   │   ├── content/page.tsx        # CMS (Hero, About, Testimonials editor)
│   │   └── settings/page.tsx       # Business profile & preferences
│   └── api/
│       ├── auth/[...all]/route.ts  # Better Auth endpoints
│       └── upload/signature/route.ts# Cloudinary signed upload token generator
├── components/
│   ├── ui/                         # Base design system primitives (Button, Input, Dialog, etc.)
│   ├── website/                    # Public UI modules (Hero, ServiceCard, GalleryGrid, etc.)
│   ├── admin/                      # Admin components (Sidebar, TopNav, BookingDrawer, etc.)
│   └── shared/                     # Cross-cutting widgets (WhatsAppButton, Logo, BrandEmblem)
├── lib/
│   ├── mongodb.ts                  # Mongoose singleton connection pool
│   ├── auth.ts                     # Better Auth configuration & session utilities
│   ├── auth-client.ts              # Better Auth React client hooks
│   ├── cloudinary.ts               # Cloudinary Node.js SDK config
│   ├── email.ts                    # Resend integration (fails gracefully if unconfigured)
│   ├── whatsapp.ts                 # WhatsApp URL & message formatter
│   └── validations/                # Zod schemas for all forms and actions
├── models/                         # Mongoose data schemas
├── actions/                        # Server Actions (Bookings, Services, Gallery, Content, Settings)
├── hooks/                          # Reusable custom React hooks
└── types/                          # TypeScript shared contracts
```

---

## 3. Key Technical Decisions

1. **State Hydration:** Static or cached server rendering for public routes with ISR (Incremental Static Regeneration) on content updates, guaranteeing instant page loads and maximum SEO scoring.
2. **Data Consistency:** MongoDB transactions / service snapshots inside booking documents to preserve exact service names and pricing at the time of reservation.
3. **Media Pipeline:** Client-side upload directly to Cloudinary using secure server-signed params generated via `/api/upload/signature`. Image binaries never touch the Next.js application server.
4. **Resilience & Graceful Degradation:** Optional integrations (e.g. Resend for email notifications) fail safely with warning logs without halting booking or content workflows.

