# Design Guidelines: Professional Agricultural AI Advisory Platform

## Design Approach

**Selected Approach:** Reference-Based + Design System Hybrid

Drawing inspiration from professional enterprise platforms like Linear (clean typography, professional spacing) and agricultural platforms while maintaining strict professional standards. Using a systematic approach to ensure consistency and scalability.

**Key Design Principles:**
- Professional credibility through clean, purposeful design
- Agricultural authenticity with earthy, trustworthy palette
- Information hierarchy for data-dense agricultural content
- Mobile-first responsive approach for field use

---

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Forest Green: `142 71% 35%` - Primary brand, headers, CTAs
- Deep Teal: `180 45% 25%` - Secondary actions, accents
- Slate Gray: `210 10% 23%` - Text, borders, professional contrast

**Supporting Colors:**
- White: `0 0% 100%` - Backgrounds, cards
- Light Gray: `210 20% 98%` - Section backgrounds
- Medium Gray: `210 10% 60%` - Secondary text
- Alert Red: `0 70% 50%` - Alerts, warnings (for disease detection)
- Success Green: `140 60% 45%` - Positive indicators, growth metrics

**Dark Mode:** Not required for this agricultural platform (field use prioritizes readability in bright conditions)

### B. Typography

**Font Family:**
- Primary: Inter (Google Fonts) - Clean, professional, excellent readability
- Monospace: JetBrains Mono - For data tables, statistics

**Type Scale:**
- Display (Hero): 48px (3rem) bold, line-height 1.1
- H1: 36px (2.25rem) bold, line-height 1.2
- H2: 30px (1.875rem) semibold, line-height 1.3
- H3: 24px (1.5rem) semibold, line-height 1.4
- Body Large: 18px (1.125rem) regular, line-height 1.6
- Body: 16px (1rem) regular, line-height 1.6
- Small: 14px (0.875rem) regular, line-height 1.5
- Caption: 12px (0.75rem) regular, line-height 1.4

### C. Layout System

**Spacing Units:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 (e.g., p-4, m-8, gap-12)

**Container Strategy:**
- Max width: 1280px (max-w-7xl)
- Content sections: max-w-6xl
- Text content: max-w-4xl
- Section padding: py-16 md:py-24

**Grid System:**
- Desktop: Up to 3-column grids for features/cards
- Tablet: 2-column maximum
- Mobile: Single column stack

### D. Component Library

**Navigation:**
- Fixed header with logo, main navigation, language selector, CTA button
- Clean horizontal layout, subtle border-bottom
- Hamburger menu for mobile with slide-in drawer

**Buttons:**
- Primary: Forest green background, white text, rounded-md
- Secondary: White background, forest green border and text
- Sizes: Small (px-4 py-2), Medium (px-6 py-3), Large (px-8 py-4)

**Cards:**
- White background with subtle border (1px solid light gray)
- Padding: p-6 to p-8
- Rounded corners: rounded-lg
- Shadow on hover: subtle elevation

**Data Tables:**
- Alternating row colors (white/light gray)
- Clean borders, monospace for numbers
- Sticky headers for long tables
- Mobile: Horizontal scroll or stacked card view

**Chat Interface:**
- Message bubbles: User (forest green, right-aligned), AI (light gray, left-aligned)
- Input: Large textarea with send button
- Clean conversation history with timestamps

**Statistics Cards:**
- Large number display (48px bold)
- Label below (14px medium gray)
- Icon or visual indicator above number
- Grid layout: 2x2 mobile, 4x1 desktop

### E. Section-Specific Design

**Hero Section:**
- Large hero image (agricultural landscape, modern farming technology)
- Overlay: None (clean image with text positioned over uncluttered areas)
- H1 headline with statistics badge above
- Two CTAs: Primary "Launch Copilot", Secondary "Watch Demo"
- Height: 600px desktop, 500px mobile

**Weather Forecast:**
- Card-based layout with location search
- Current conditions: Large temperature, weather icon, conditions
- 5-day forecast: Horizontal scroll cards on mobile
- Clean data presentation with icons

**Market Prices Table:**
- Sortable columns: Commodity, Price, Change, Market
- Refresh button (top-right)
- Color-coded price changes (green up, red down)
- Last updated timestamp

**Crop Recommendations:**
- 3-column grid desktop, single column mobile
- Card design: Crop image, title, key metrics
- Profit potential: Progress bar visualization
- Season tags: Subtle pill-style badges
- "View Details" link button

**Features Grid:**
- 3x2 grid desktop, 1 column mobile
- Icon (agricultural-themed, simple line icons), title, description
- Consistent card heights
- Hover: Subtle border color change

**AI Models Section:**
- 3-column layout for model variants (8B, 3B, 1B)
- Badge system: "PRODUCTION", "BALANCED", "MOBILE"
- Technical specs in clean list format
- "View on HuggingFace" link buttons

**Use Cases:**
- 2x2 grid desktop, 1 column mobile
- Image (relevant to use case), title, description, key features list
- Professional photography (farmers, agribusiness, livestock, government)

**Chat Demo (PashuAI):**
- Conversational interface preview
- Language selector dropdown
- Sample conversation shown
- "Try Live Demo" CTA prominent

**Statistics Dashboard:**
- 4 key metrics in horizontal row
- Large numbers with labels
- Clean separators between metrics

**Footer:**
- Multi-column layout: Company info, Quick Links, Resources, Contact
- Newsletter signup (email input + button)
- Language selector repeated
- Social links (professional icons only)
- Copyright and legal links

---

## Images Strategy

**Hero Image:** Large, high-quality agricultural landscape showing modern farming with technology integration (drone, green fields, sunrise/blue sky). Image should be 2400x800px, professionally shot.

**Use Case Images:** 4 professional photos - farmer in field, modern agribusiness facility, livestock/veterinary care, government extension service. Each 400x300px.

**Feature Icons:** Use Font Awesome agricultural/technology icons via CDN - simple, professional line-style icons (no emojis).

**Crop Recommendation Cards:** Stock photos of crops (wheat, mustard, maize, etc.) - 300x200px each.

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full 3-column layouts)

**Mobile Optimizations:**
- Touch-friendly button sizes (minimum 44px height)
- Horizontal scrolling for tables and forecast cards
- Collapsible navigation drawer
- Larger font sizes for readability
- Stackable form layouts

---

## Animation & Interaction

**Minimal, Professional Animations:**
- Fade-in on scroll for section reveals (200ms)
- Hover state: Subtle border color change (150ms)
- Button press: Slight scale (0.98) on active
- NO page transitions, NO gradient animations, NO emoji reactions

**Loading States:**
- Skeleton screens for data tables
- Spinner for API calls (simple circular)
- Progress bars for data loading

---

## Accessibility & Performance

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratios meet WCAG AA standards
- Lazy loading for images below fold
- Optimized API routes for fast data fetching