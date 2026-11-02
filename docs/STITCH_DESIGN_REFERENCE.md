# Stitch Design Reference: The Luxe Touch

## Projects Overview

The Luxe Touch design system is authored in Google Stitch across two dedicated projects:
1. **Public Website:** `projects/1241965996315945495` ("The Luxe Touch Beauty Website")
   - Device Type: Desktop (`TEXT_TO_UI_PRO`)
   - Design System Name: `Haute Concierge`
2. **Admin Dashboard & CMS:** `projects/1209214933312322539` ("The Luxe Touch Admin")
   - Device Type: Desktop (`TEXT_TO_UI_PRO`)
   - Design System Name: `Boutique Atelier`

---

## 1. Public Website Screens (`projects/1241965996315945495`)

### Screen 1: The Luxe Touch — Luxury Beauty At Home (Landing Page)
- **Screen ID:** `30f5184564ca4a42ad50af337799a14d`
- **Resolution:** 2560 × 12932 px
- **Sections:**
  1. *Header & Navigation:* Sticky frosted glass (`bg-surface/85 backdrop-blur-xl`), logo emblem with gold ring, desktop nav links with animated gold underline, "Book a Visit" gold-ring button, mobile drawer toggle.
  2. *Section 01: Hero (Deep Emerald):*
     - Headline: *"Beauty, in the comfort of home."* (with italicized flourish).
     - Subhead: *"Experience personalised beauty and grooming services, thoughtfully delivered to your doorstep. Your beauty ritual, your space, your time."*
     - Actions: Primary emerald button *"Book Your Appointment"*, secondary gold outline button *"Explore Our Services"*.
     - Trust Badges: 100% Sanitised Private Kits, 5.0 ★ Estate Patron Rating, Haute Certified Artisans.
     - Hero Visual: Editorial portrait in emerald silk, master somatics stylist floating badge.
  3. *Section 02: Brand Introduction (Warm Ivory):*
     - Eyebrow: `A MORE PERSONAL KIND OF LUXURY`
     - Headline: *"Your time. Your space. Your glow."*
     - Story: Pure botanicals, vetted specialists, strict privacy.
  4. *Section 03: Explore Services (Soft Beige):*
     - 6 category cards: Facials & Skincare, Hair Care & Styling, Haute Makeup, Nail Couture, Gentle Grooming, Somatic Massage.
  5. *Section 04: Featured In-Residence Therapies (Signature Menu):*
     - Treatment cards with duration badges, pricing, descriptions, and "Book Now" / "Details" actions.
  6. *Section 05: The Privilege Charter (Why The Luxe Touch):*
     - Visual with gold border flourish + The Atelier Oath badge.
     - 3 numbered pillars: 01 At Your Doorstep, Seamlessly; 02 Personalised Haute Touch; 03 Your Time, Respected.
  7. *Section 06: Artisanal Gallery:*
     - Filter tabs: All, Bridal, Makeup, Hair, Skincare.
     - High-fashion editorial photography grid with hover overlays and interactive lightbox.
  8. *Section 07: Client Testimonials & Social Proof:*
     - Patron reviews with 5-star ratings, verified appointment tags.
  9. *Section 08: Booking Enquiry CTA:*
     - Ambient emerald card with calendar booking shortcuts and direct concierge hotline.
  10. *Section 09: Concierge Contact & Private Enquiries:*
      - Telephone, WhatsApp Click-to-Chat, Private Email, Service coverage zones.
  11. *Footer:*
      - Haute atelier emblem, legal links (Privacy Policy, Terms of Service), copyright notice.

### Screen 2: Services & Rituals — The Luxe Touch (Service Menu)
- **Screen ID:** `0e4f6e0ac7034c8f8e747d119bd88936`
- **Resolution:** 2560 × 11458 px
- **Sections:** Detailed breakdown of all 6 service categories with expandable ritual details, botanical ingredients, contraindications, preparation requirements, and direct booking actions.

### Generated Visual Assets:
- Opulent Indian Bridal Makeup Look (`76eee8e9149f46e0a20d246c1834bf91`)
- Luxury At-Home Facial & Botanical Skincare Ritual (`b19c149b94de4fe1a3c12b9bb658fe7c`)
- Luxury Hair Spa & Botanical Elixir Treatment (`3844e3702fc1499c8a912de9c4771fc8`)
- Cinematic High-Fashion Beauty Portrait (`b02a9c7354d448239e154a8f4442b316`)

---

## 2. Admin Dashboard Screens (`projects/1209214933312322539`)

### Screen 1: Overview Dashboard
- **Screen ID:** `3b1a772b1df249dc89ad00d2d4c2b17e`
- **Resolution:** 2560 × 2950 px
- **Key Modules:**
  - *Header:* Atelier logomark, global search (`⌘K`), notification bell, user profile avatar.
  - *Navigation Sidebar (260px):* Overview, Bookings, Services, Gallery, Website Content, Settings. Footer with View Website, Support, Logout.
  - *Metric Row (4 Stats):* Total Bookings, New Enquiries, Active Services, Monthly Revenue.
  - *Quick Action Cards:* Add Service, Upload Photos, View Bookings.
  - *Operational Panels:* Recent Bookings Table (Client name, Service, Date/Time, Status pill, Action menu) + Today's Schedule timeline.

### Screen 2: Bookings Management & Detail
- **Screen ID:** `e1bef1301d994d9a82937adc20ea96b6`
- **Resolution:** 2560 × 2662 px
- **Key Modules:**
  - KPI counters: Total Bookings, Inquiries, Conversion Rate, Period Revenue.
  - Status filter tabs: All, New, Contacted, Confirmed, Completed, Cancelled.
  - Search & date range selector.
  - Bookings ledger table with pagination.
  - **Slide-Over Detail Drawer (480px):**
    - Client Profile & contact shortcuts (Call, WhatsApp, Email).
    - Booking Reference & timestamp.
    - Quoted Service Snapshot & pricing.
    - Address & Venue classification (Home / Hotel / Venue).
    - Internal Staff Notes & status progression controls.

### Screen 3: Services Management
- **Screen ID:** `158ee7137783430ba4e40504623547c4`
- **Resolution:** 2560 × 3164 px
- **Key Modules:**
  - Category selector tabs & active/featured service filters.
  - Service creation & edit modals/forms (Name, Slug, Category, Pricing mode, Duration, Descriptions, Image uploader, SEO metadata).
  - Drag-and-drop reordering & toggle active/featured switch.

### Screen 4: Gallery Management
- **Screen ID:** `29a3ea71e7aa4d83a325d609ee31967f`
- **Resolution:** 2560 × 2424 px
- **Key Modules:**
  - Drag-and-drop Cloudinary media upload dropzone with 1.5px dashed Champagne Gold borders.
  - Category tagging, caption editor, featured hero image toggles, published/draft switch.

