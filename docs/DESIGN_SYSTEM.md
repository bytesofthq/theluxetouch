# Design System: The Luxe Touch

## 1. Visual Direction & Themes

The application implements a tailored dual-experience design system derived from the approved Stitch prototypes:
- **Public Client Experience:** `Haute Concierge` (Classical luxury editorial, warm ivories, rich botanical emeralds, and champagne gold accents).
- **Administration Portal:** `Boutique Atelier` (Modern editorial SaaS, high-density utility, warm neutral backgrounds, crisp typography, and unambiguous status signalling).

---

## 2. Color Palette & Tokens

### Primary Brand Palette
| Name | Token | Hex | Role |
|---|---|---|---|
| Deep Emerald | `--color-emerald` | `#073C33` | Primary brand authority, dominant headings, primary action buttons, dark mode blocks |
| Dark Forest | `--color-forest` | `#052D27` | Deep background footer containers, button active/pressed states |
| Warm Ivory | `--color-ivory` | `#F7F2E9` (`#FEF9F0`) | Primary canvas background for public site, organic hospitable surface |
| Champagne Gold | `--color-gold` | `#D8B77E` | Hairline rules, luxury icons, active indicators, VIP highlights |
| Soft Beige | `--color-beige` | `#EDE3D5` | Elevated card backgrounds, nested service panels, subtle dividers |
| Deep Espresso | `--color-espresso` | `#30251F` | High-contrast running typography, softer and richer than pure digital black |
| Muted Rose | `--color-rose` | `#C9A49A` | Specialized appointment chips, delicate botanical warmth accents |

### Admin Surface & Semantic Tones
- **Admin Canvas Base:** `#F7F6F2` (Warm Ivory tone)
- **Container Surfaces:** `#FFFFFF` (Pure White cards with 1px `#EAE7E0` hairline borders)
- **Status Pills:**
  - *New / Enquiry:* Foreground `#B45309`, Background `#FEF3C7` (Amber)
  - *Contacted:* Foreground `#1D4ED8`, Background `#EFF6FF` (Blue)
  - *Confirmed / Completed:* Foreground `#2E7D32`, Background `#E8F5E9` (Green)
  - *Cancelled:* Foreground `#DC2626`, Background `#FEE2E2` (Red)
  - *VIP / Curated:* Foreground `#D8B77E`, Background `#FBF7EE` (Gold)

---

## 3. Typography

- **Headings (Public):** `Cormorant Garamond` / `EB Garamond`
  - Weights: Regular 400, Medium 500
  - Tracking: `-0.015em` to `-0.025em`
  - Italic phrasing used selectively for evocative luxury adjectives (e.g., *"Beauty, in the comfort of home"*).
- **Body & UI Elements (Public & Admin):** `Manrope`
  - Clean geometric humanist sans-serif with high tabular density.
  - Weights: Regular 400, Medium 500, Semi-Bold 600, Bold 700.
  - Tabular figures (`tabular-nums`) used for booking times, reference codes, and financial metrics.
- **Overlines & Micro-labels:**
  - Set in `label-sm` or `label-md` strictly in uppercase with wide tracking (`0.12em` to `0.25em`).

---

## 4. Spacing, Geometry & Shadows

- **Spacing Scale:** Base 4px scale (`0.25rem` space-xs, `0.5rem` space-sm, `1rem` space-md, `1.5rem` space-lg, `2rem` space-xl, `3rem` space-2xl).
- **Corner Radii:**
  - Inputs, Buttons, Badges, Table Rows: `4px` (`rounded-sm` / `0.25rem`).
  - Cards & Content Modules: `8px` (`rounded-md` / `0.5rem`).
  - Dialogs & Slide-Over Drawers: `12px` (`rounded-lg` / `0.75rem`).
  - Status Tags & Indicators: `9999px` (`rounded-full`).
- **Elevation Philosophy:**
  - Zero heavy dark drop-shadows.
  - Structural separation via background shifts and 1px hairlines (`rgba(216, 183, 126, 0.35)` or `#EAE7E0`).
  - Ambient diffuse glows: `0 12px 32px -4px rgba(48, 37, 31, 0.06)`.

