# Project Specification: The Luxe Touch

## 1. Executive Summary

**The Luxe Touch** is a digital platform for a premium personal beauty and grooming service delivered directly to clients' homes, hotels, or private venues. The application bridges the gap between client convenience and luxury spa-grade aesthetics, paired with an admin management console for business operations.

## 2. Core Functional Requirements

### 2.1 Public Client Experience
1. **Dynamic Homepage:**
   - Editorial Hero with custom copy, CTAs, and background imagery.
   - Interactive service category cards leading to dedicated catalog views.
   - Featured signature treatments with durations and pricing.
   - Privileged charter (Pillars of trust, hygiene, discretion).
   - Filterable lookbook gallery with modal lightbox.
   - Verified client reviews and testimonials.
   - Direct booking enquiry launcher & interactive footer.
2. **About Us Page (`/about`):**
   - Brand narrative, master aesthetician story, credentials, strict hygiene protocol.
3. **Services Catalog (`/services` & `/services/[slug]`):**
   - 6 categories:
     - Facials & Skincare (Facial, Clean-up, De-tan)
     - Hair Care (Hair Spa, Hair Cutting, Split Ends, Keratin, Hair Botox, Nanoplastia)
     - Makeup (Regular, Party, Bridal)
     - Body Care & Massage (Body Polishing, Full Body Bleach, Body Massage, Head Massage)
     - Hand & Foot Care (Manicure, Pedicure)
     - Waxing & Grooming (Waxing)
   - Dynamic service detail pages with SEO tags, durations, preparations, and direct booking pre-selection.
4. **Artisanal Gallery (`/gallery`):**
   - High-resolution categorized editorial gallery, responsive grid, lightbox modal.
5. **Booking Enquiry System (`/book`):**
   - Multi-step or streamlined single-page form with client validation (Zod).
   - Category and service selection, preferred date, preferred time slot, location type (Home, Hotel, Venue, Other), address, and notes.
   - Automatic generation of human-readable booking reference (`LT-YYYYMMDD-XXXX`).
   - Clear disclosure that enquiries are subject to concierge availability confirmation.
6. **Concierge & Contact (`/contact`):**
   - Dynamic contact data: phone, email, WhatsApp Click-to-Chat, operating hours, service coverage areas.
7. **Legal Policies:**
   - `/privacy-policy` and `/terms`.

### 2.2 Business Administration & CMS (`/admin`)
1. **Secure Authentication:**
   - Better Auth with MongoDB adapter.
   - HTTP-only secure cookie sessions, CSRF protection, brute force rate-limiting.
   - Initial owner setup via seed script (`scripts/create-owner.ts`).
2. **Overview Dashboard (`/admin`):**
   - Operational KPIs (Total Bookings, New Inquiries, Confirmed, Completed, Revenue).
   - Quick Action triggers (Add Service, Upload Photos, View Bookings).
   - Today's appointment agenda & recent enquiries table.
3. **Bookings Management (`/admin/bookings`):**
   - Search, status filtering (`new`, `contacted`, `confirmed`, `completed`, `cancelled`), date filters.
   - Slide-over detail drawer for appointment management.
   - Direct WhatsApp message generator with pre-filled enquiry details.
   - Internal staff audit notes & immutable service snapshot.
4. **Services Management (`/admin/services`):**
   - Full CRUD for services and categories.
   - Pricing modes: Fixed, Starting at, Quote required, Hidden.
   - Active/Inactive toggle, Featured toggle, drag-and-drop sort order.
5. **Gallery Management (`/admin/gallery`):**
   - Direct upload to Cloudinary via signed server actions.
   - Category tagging, title, caption, featured toggle, publication status.
6. **Website Content CMS (`/admin/content`):**
   - WYSIWYG/field-level editing for Homepage hero, introduction, pillars, About Us story, and Testimonials.
7. **Business Settings (`/admin/settings`):**
   - Brand name, contact numbers, WhatsApp concierge line, service radius, email notifications, operating hours.

