# Database Schema Specification: The Luxe Touch

**Target Database:** `theluxetouch` (MongoDB Atlas)  
**ORM / Driver:** Mongoose  

---

## 1. Application Collections

### 1.1 `serviceCategories`
Groups services into the 6 designated luxury departments.
```typescript
{
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String },
  image: {
    url: String,
    publicId: String,
    alt: String
  },
  isActive: { type: Boolean, default: true, index: true },
  displayOrder: { type: Number, default: 0 },
  timestamps: true
}
```

### 1.2 `services`
Individual treatments offered by The Luxe Touch.
```typescript
{
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'ServiceCategory', required: true, index: true },
  shortDescription: { type: String, required: true },
  description: { type: String },
  image: {
    url: String,
    publicId: String,
    alt: String
  },
  pricing: {
    mode: { 
      type: String, 
      enum: ['fixed', 'starting_at', 'quote_required', 'hidden'], 
      default: 'fixed' 
    },
    amount: { type: Number, min: 0 },
    currency: { type: String, default: 'INR' }
  },
  durationMinutes: { type: Number, min: 0 },
  isFeatured: { type: Boolean, default: false, index: true },
  isActive: { type: Boolean, default: true, index: true },
  displayOrder: { type: Number, default: 0 },
  seo: {
    title: String,
    description: String
  },
  timestamps: true
}
```

### 1.3 `bookings`
In-home and on-venue client reservations.
```typescript
{
  bookingReference: { type: String, required: true, unique: true, index: true }, // Format: LT-YYYYMMDD-XXXX
  customer: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true, index: true },
    email: { type: String }
  },
  service: {
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
    serviceName: { type: String, required: true },
    categoryName: { type: String, required: true },
    pricingSnapshot: {
      mode: String,
      amount: Number,
      currency: String
    },
    durationMinutes: Number
  },
  appointment: {
    preferredDate: { type: String, required: true }, // Format: YYYY-MM-DD
    preferredTime: { type: String, required: true }, // e.g. "10:30 AM" or "Morning"
    locationType: { 
      type: String, 
      enum: ['home', 'hotel', 'venue', 'other'], 
      required: true 
    },
    address: { type: String, required: true }
  },
  additionalNotes: { type: String },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'confirmed', 'completed', 'cancelled'], 
    default: 'new', 
    index: true 
  },
  adminNotes: { type: String },
  statusHistory: [
    {
      status: { type: String, required: true },
      changedAt: { type: Date, default: Date.now },
      changedBy: { type: String, default: 'system' },
      note: String
    }
  ],
  timestamps: true
}
```

### 1.4 `galleryImages`
Curated lookbook photographs.
```typescript
{
  title: { type: String, required: true },
  description: { type: String },
  image: {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    width: Number,
    height: Number,
    alt: String
  },
  category: { 
    type: String, 
    enum: ['bridal', 'makeup', 'hair', 'skincare', 'general'], 
    default: 'general',
    index: true 
  },
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true, index: true },
  displayOrder: { type: Number, default: 0 },
  timestamps: true
}
```

### 1.5 `testimonials`
Verified patron reviews.
```typescript
{
  customerName: { type: String, required: true },
  roleOrLocation: { type: String }, // e.g. "Private Estate Patron, Mumbai"
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  isPublished: { type: Boolean, default: true, index: true },
  displayOrder: { type: Number, default: 0 },
  timestamps: true
}
```

### 1.6 `pageContents`
Dynamic CMS sections for public pages.
```typescript
{
  page: { type: String, required: true, index: true }, // 'home', 'about', 'contact'
  section: { type: String, required: true, index: true }, // 'hero', 'introduction', 'charter'
  content: { type: Schema.Types.Mixed, required: true }, // Structured content object
  isPublished: { type: Boolean, default: true },
  timestamps: true
}
// Compound index on { page: 1, section: 1 } (unique)
```

### 1.7 `siteSettings`
Global business settings and configuration.
```typescript
{
  brandName: { type: String, default: 'The Luxe Touch' },
  tagline: { type: String, default: 'Personalised Beauty & Grooming Delivered to You' },
  logoUrl: { type: String },
  contact: {
    phone: { type: String },
    whatsappNumber: { type: String },
    email: { type: String },
    addressNote: { type: String, default: 'Delivered in the comfort of your home or private venue' }
  },
  serviceAreas: [{ type: String }],
  socialLinks: {
    instagram: String,
    facebook: String,
    youtube: String
  },
  businessHours: {
    weekdays: { type: String, default: '9:00 AM - 8:00 PM' },
    weekends: { type: String, default: '8:00 AM - 9:00 PM' }
  },
  bookingPreferences: {
    minimumNoticeHours: { type: Number, default: 24 },
    enableInstantWhatsAppConfirmation: { type: Boolean, default: true }
  },
  seo: {
    defaultTitle: String,
    defaultDescription: String
  },
  timestamps: true
}
```

### 1.8 `auditLogs`
Immutable record of administrative actions.
```typescript
{
  adminUser: { type: String, required: true },
  action: { type: String, required: true }, // e.g., 'UPDATE_BOOKING_STATUS', 'CREATE_SERVICE'
  targetCollection: { type: String, required: true },
  targetId: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now, index: true }
}
```

---

## 2. Better Auth Managed Collections
Better Auth manages its own tables/collections in MongoDB:
- `users` (id, email, name, role, emailVerified, createdAt, updatedAt)
- `sessions` (id, userId, token, expiresAt, ipAddress, userAgent, createdAt, updatedAt)
- `accounts` (id, userId, accountId, providerId, passwordHash, createdAt, updatedAt)
- `verifications` (id, identifier, value, expiresAt, createdAt, updatedAt)

