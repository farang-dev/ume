# Ume Tattoo Studio — Design System

> **Studio:** Ume Tattoo · Vilnius, Lithuania  
> **Artist:** Monika ([@monika.ume](https://www.instagram.com/monika.ume/))  
> **Languages:** Lithuanian (default) · English  
> **Stack:** Next.js 15 (App Router) · Sanity v3 · next-intl · GSAP · Framer Motion · Calendly

---

## 1. Brand Identity

### Concept
*Ume* (梅) is the Japanese plum blossom — a symbol of resilience, quiet elegance, and the beauty that arrives before the thaw. The studio's aesthetic reflects this: **chic minimalism**, deliberate whitespace, and precise linework that mirrors the tattoo art itself.

### Tone
- **Visual**: monochrome with a single warm accent
- **Typographic**: refined, understated — no shouting
- **Motion**: unhurried, intentional — like ink settling into skin

---

## 2. Color System

### Palette Tokens

| Token                | Value          | Usage                                 |
|----------------------|----------------|---------------------------------------|
| `--color-bg`         | `#0A0A0A`      | Page background (near-black)          |
| `--color-surface`    | `#111111`      | Card / panel background               |
| `--color-surface-2`  | `#1C1C1C`      | Elevated surfaces, hover states       |
| `--color-border`     | `#2A2A2A`      | Subtle borders                        |
| `--color-text-primary`| `#F5F0EB`     | Primary text (warm white)             |
| `--color-text-secondary`| `#9A9590`   | Supporting text, captions             |
| `--color-text-muted` | `#5A5550`      | Placeholders, disabled                |
| `--color-ume`        | `#C0392B`      | Ume red — primary accent (plum/blood) |
| `--color-ume-light`  | `#E74C3C`      | Hover / highlight state of accent     |
| `--color-ume-dark`   | `#922B21`      | Pressed / deep accent                 |
| `--color-white`      | `#FFFFFF`      | Pure white for high contrast moments  |

### Usage Rules
- **Never** mix ume red with coloured backgrounds — it only lives on black/dark surfaces
- Use `--color-ume` sparingly: the logo, the scroll thread, active nav item, CTAs
- Text on ume-red buttons must be `--color-white`

---

## 3. Typography

### Font Stack

| Role          | Font              | Weight(s)   | Source          |
|---------------|-------------------|-------------|-----------------|
| Display       | **Cormorant**     | 300, 400    | Google Fonts    |
| Body          | **DM Sans**       | 300, 400    | Google Fonts    |
| Label / UI    | **DM Mono**       | 300, 400    | Google Fonts    |
| Japanese (accent) | **Noto Serif JP** | 400     | Google Fonts    |

### Scale (rem / px at 16px base)

| Token          | rem    | px   | Typical use                     |
|----------------|--------|------|---------------------------------|
| `--text-xs`    | 0.75   | 12   | Legal, micro-labels             |
| `--text-sm`    | 0.875  | 14   | Captions, metadata              |
| `--text-base`  | 1      | 16   | Body text                       |
| `--text-lg`    | 1.25   | 20   | Lead paragraphs                 |
| `--text-xl`    | 1.75   | 28   | Section intros                  |
| `--text-2xl`   | 2.5    | 40   | Section headings                |
| `--text-3xl`   | 3.5    | 56   | Hero sub-headline               |
| `--text-4xl`   | 5      | 80   | Hero display                    |
| `--text-5xl`   | 7      | 112  | Oversized typographic moments   |

### Typographic Rules
- Headings: `Cormorant`, light/thin weights, generous letter-spacing (`0.04em`–`0.12em`)
- Body: `DM Sans` 300 weight, line-height `1.75`
- UI labels: `DM Mono` uppercase, `0.15em` letter-spacing, `--text-xs`
- Japanese accent glyphs (ume 梅): `Noto Serif JP` used inline for decoration

---

## 4. Spacing & Layout

### Grid
- **Desktop**: 12-col grid, `max-width: 1400px`, `gutter: 32px`
- **Tablet**: 8-col, `gutter: 24px`
- **Mobile**: 4-col, `gutter: 16px`

### Spacing Scale (8px base)

| Token       | px  |
|-------------|-----|
| `--space-1` | 8   |
| `--space-2` | 16  |
| `--space-3` | 24  |
| `--space-4` | 32  |
| `--space-5` | 48  |
| `--space-6` | 64  |
| `--space-7` | 96  |
| `--space-8` | 128 |
| `--space-9` | 192 |

### Section Padding
- Desktop: `120px` top/bottom
- Tablet: `80px`
- Mobile: `60px`

---

## 5. The Red Thread — Scroll Motif 🧵

This is the signature animated element: a **SVG path that draws itself** as the user scrolls, simulating a red thread weaving through the page — like the Japanese legend of the red string of fate (赤い糸, *akai ito*).

### Technical Implementation
- **SVG**: Full-page absolute-positioned SVG with `overflow: visible`
- **Library**: GSAP ScrollTrigger + `stroke-dashoffset` animation
- **Path**: Organic, flowing bezier curves that wind between sections
- **Color**: `--color-ume` (#C0392B) with `opacity: 0.6`
- **Stroke**: `1.5px`, `stroke-linecap: round`
- **Pointer events**: `none` — purely decorative layer
- **Performance**: `will-change: stroke-dashoffset`, GPU-composited

### Behaviour
- Thread starts at the hero logo and ends at the footer logo
- Progress mirrors scroll position (0% at top → 100% at footer)
- Thread has natural sag/curve between sections
- On mobile: simplified shorter thread or disabled

---

## 6. Motion & Animation

### Principles
- **Ease**: `cubic-bezier(0.25, 0.1, 0.25, 1)` — smooth deceleration
- **Duration**: Short UI (150ms), element reveals (600ms), page transitions (800ms)
- **Respect**: Always check `prefers-reduced-motion`

### Standard Reveals (Framer Motion)
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
}

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
}
```

### Hover States
- Links: `color` transition 200ms → `--color-ume`
- Buttons: subtle `transform: translateY(-1px)` + glow `box-shadow`
- Gallery images: `scale(1.03)` + desaturation lift, 300ms
- Nav items: underline slide-in from left

---

## 7. Components

### Navigation
- Fixed top, `backdrop-filter: blur(12px)`, dark semi-transparent background
- Logo (left) + Nav links (center) + Language switcher + CTA button (right)
- Mobile: hamburger → full-screen overlay menu with staggered link animation
- Language switcher: `LT | EN` text toggle (no flags)
- Active state: ume-red dot beneath link or underline

### Hero Section
- Full viewport height
- Large display typography: studio name in Cormorant
- Japanese character 梅 as large ghost/watermark behind text
- Subtle particle/noise texture overlay
- CTA: "Book a session" → Calendly modal
- Scroll indicator: animated thread spool / down arrow

### Gallery
- **Masonry grid** (CSS columns or JS masonry)
- Pulled from Sanity CMS (image + title + tags)
- **Filtering**: by style tag (fine-line, blackwork, botanical, etc.)
- Lazy loading with blur placeholder
- Lightbox on click (custom or `yet-another-react-lightbox`)
- Mobile: 2-column masonry

### About Section
- Split layout: full-bleed artist photo (left) + text (right)
- Bio pulled from Sanity (rich text / portable text)
- Studio address + map embed (Vilnius)
- Subtle background: fine horizontal rule lines like skin texture

### Services / Menu
- Cards grid from Sanity
- Each card: service name, short description, price range, duration
- Clean table-like layout on mobile
- CTA per card → Calendly with pre-selected service

### Appointment / Booking
- Embedded Calendly widget (inline embed, not popup)
- Styled to match dark theme via Calendly CSS variables
- Pre-fill available: name, email, service type
- Alternative: Cal.com (open source, more customisable)

### Footer
- Logo (centered or left)
- Navigation links
- Social: Instagram icon(s)
- Studio address (Vilnius, Lithuania)
- Copyright + language note
- Red thread terminates here

---

## 8. Page Structure

```
/ (root)
├── [locale]                    ← next-intl locale routing (lt, en)
│   ├── page.tsx                ← Home (Hero + Gallery preview + About + Services + Booking)
│   ├── gallery/page.tsx        ← Full gallery
│   ├── about/page.tsx          ← Extended about page
│   └── booking/page.tsx        ← Dedicated booking page
└── studio/                     ← Sanity Studio (embedded)
```

---

## 9. Internationalisation (i18n)

### Setup: `next-intl`
- Default locale: `lt` (Lithuanian)
- Secondary locale: `en` (English)
- Routing: `/lt/...` and `/en/...` with automatic redirect from `/`
- All UI strings in `/messages/lt.json` and `/messages/en.json`

### Content in Sanity
- All CMS content (gallery, bio, services) uses **localised fields**:
  ```json
  { "lt": "Tatuiruočių studija", "en": "Tattoo Studio" }
  ```

---

## 10. CMS — Sanity v3

### Schemas

#### `gallery` collection
```ts
{
  name: 'galleryItem',
  fields: [
    { name: 'image', type: 'image', options: { hotspot: true } },
    { name: 'title', type: 'localeString' },    // { lt, en }
    { name: 'style', type: 'string', options: { list: ['fine-line','blackwork','botanical','geometric','traditional'] } },
    { name: 'featured', type: 'boolean' },
    { name: 'order', type: 'number' },
  ]
}
```

#### `service` collection
```ts
{
  name: 'service',
  fields: [
    { name: 'name', type: 'localeString' },
    { name: 'description', type: 'localeBlockContent' },
    { name: 'priceFrom', type: 'number' },
    { name: 'duration', type: 'string' },        // e.g. "1–2h"
    { name: 'calendlyEventSlug', type: 'string' },// links to specific Calendly event
  ]
}
```

#### `about` (singleton)
```ts
{
  name: 'about',
  fields: [
    { name: 'artistName', type: 'string' },
    { name: 'bio', type: 'localeBlockContent' },
    { name: 'photo', type: 'image' },
    { name: 'studioAddress', type: 'string' },
    { name: 'instagramHandle', type: 'string' },
  ]
}
```

---

## 11. Booking — Calendly vs Cal.com

| Feature                  | Calendly          | Cal.com (open source) |
|--------------------------|-------------------|-----------------------|
| Ease of setup            | ✅ Very easy       | ⚠️ More setup         |
| Custom styling           | ⚠️ Limited         | ✅ Full control        |
| Self-hosted              | ❌ No              | ✅ Yes (or cloud)      |
| Per-service event types  | ✅ Yes             | ✅ Yes                 |
| Cost                     | Free tier limited | Free (self-host)      |
| Recommendation           | **Start here**    | Upgrade path          |

**Decision: Start with Calendly** (free tier works well for a solo artist).  
Use `@calendly/react-widget` inline embed styled dark with CSS variables.  
Each service card links to a specific Calendly event type slug.

---

## 12. File & Folder Structure

```
/src
  /app
    /[locale]
      layout.tsx          ← Locale layout with next-intl provider
      page.tsx            ← Home page
      /gallery
        page.tsx
      /about
        page.tsx
      /booking
        page.tsx
  /components
    /layout
      Header.tsx
      Footer.tsx
      RedThread.tsx       ← GSAP scroll thread animation
    /sections
      Hero.tsx
      GallerySection.tsx
      AboutSection.tsx
      ServicesSection.tsx
      BookingSection.tsx
    /ui
      Button.tsx
      ImageCard.tsx
      Lightbox.tsx
      LanguageSwitcher.tsx
      CalendlyEmbed.tsx
  /lib
    /sanity
      client.ts
      queries.ts
      image.ts
    /i18n.ts
  /messages
    lt.json
    en.json
  /styles
    globals.css           ← Design tokens + base styles
    animations.css        ← Keyframes
/sanity
  /schemas
    index.ts
    galleryItem.ts
    service.ts
    about.ts
  sanity.config.ts
```

---

## 13. Responsiveness Breakpoints

| Name     | Min-width | Target                  |
|----------|-----------|-------------------------|
| `sm`     | 480px     | Large phones landscape  |
| `md`     | 768px     | Tablets                 |
| `lg`     | 1024px    | Small laptops           |
| `xl`     | 1280px    | Desktop                 |
| `2xl`    | 1536px    | Wide desktop            |

---

## 14. Performance Targets

- **LCP** < 2.5s (hero image via `next/image` with `priority`)
- **CLS** < 0.1 (image dimensions always set)
- **INP** < 200ms
- Images: WebP/AVIF via Sanity + Next.js Image Optimisation
- Fonts: `display: swap`, preloaded
- Thread SVG: rendered client-side only, skeleton on SSR

---

## 15. Open Questions / Decisions for Client

1. **Logo file**: Do you have an SVG or high-res PNG of the logo?
2. **Calendly account**: Which tier / username does Monika use?
3. **Domain**: What will the domain be? (affects `next-intl` base URL)
4. **Sanity plan**: Free tier is sufficient for this project
5. **Studio address**: Full address for footer + map embed?
6. **Gallery content**: Initial batch of images from Monika's Instagram?
7. **Thread placement**: Should the thread appear on every page or only the homepage?
