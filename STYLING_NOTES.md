# Web App Style Guide

**Revenue Share System - Design Vibe & Feel**

A quick reference for understanding the visual design and atmosphere of this web app.

---

## The Overall Vibe

**Premium Business Meets Modern Glass**

Think of a high-end executive lounge at night - warm lighting, polished metals, frosted glass surfaces. The design feels:
- **Professional but not corporate** - Sophisticated without being stuffy
- **Warm and inviting** - Dark backgrounds with golden accents create comfort
- **Clean and minimal** - Everything has space to breathe
- **Subtly animated** - Gentle movements and glows, never jarring

---

## Color Palette & Mood

### The Foundation: Warm Darkness
Deep charcoal backgrounds with warm undertones - not pure black, but rich and cozy. Like a fireplace-lit room or a jazz club in the evening.

### The Shine: Platinum & Champagne Gold
- **Platinum silver** - Cool, refined metal for text and secondary elements
- **Champagne gold** - Warm, rich gold for accents, borders, and interactive elements
- Not flashy or gaudy - think elegant jewelry, not Las Vegas

### The Accents
- **Teal blue** - Professional pop of color (used for the Load button)
- **Bronze** - Warm metallic complement
- **Soft white** - Primary text that's easy on the eyes

---

## The Glass-Morphism Effect

**What it looks like:** Frosted glass overlays with subtle transparency and blur

Every major card, section, and container uses this effect:
- Semi-transparent background you can almost see through
- Blurred backdrop (like frosted glass)
- Thin, subtle borders
- Soft shadows with golden tints

This creates depth and layers without harsh boxes.

---

## Typography Feel

### Fonts That Feel Modern & Professional
- **Headings:** Outfit - Clean, geometric, slightly rounded (friendly professionalism)
- **Body text:** Inter - Ultra-readable, neutral, modern
- **Numbers/Stats:** JetBrains Mono - Technical precision without feeling "code-y"

### Sizing Philosophy
Everything is slightly compact - tight line-heights, controlled spacing. The app feels efficient and organized, not sprawling.

---

## Interactive Elements

### Buttons
- **Primary (gold):** Gradient from champagne to darker gold, subtle glow on hover
- **Secondary (platinum):** Transparent with platinum border, inverts on hover
- **Hover behavior:** Buttons lift slightly upward + glow effect + ripple animation from center

### Cards & Containers
- All cards "float" with soft shadows
- Hover effect: Cards lift + glow intensifies + animated platinum shine sweeps across the border
- Feels tactile and responsive, like touching premium materials

---

## Animations & Movement

**Philosophy: Subtle, smooth, purposeful**

### Background
- Slow-moving gradient blobs of gold/teal/platinum that flow across the screen (25-30 second loops)
- Very subtle diagonal scan lines for texture
- Creates a living, breathing atmosphere without distraction

### Interactions
- Tab switching: Gentle fade-in with slight upward movement
- Hover effects: Quick lifts (0.25s) with glows
- Timeline items: Slide in from the left when rendered
- All transitions feel natural, never robotic

### What You Won't Find
- No harsh cuts or snaps
- No bouncing or over-animated elements
- No jarring color shifts
- Respects "reduced motion" accessibility settings

---

## Layout & Spacing

**Compact but Never Cramped**

The design philosophy is "efficiency without claustrophobia":
- Navbar: Sleek 70px height (most apps use 100px+)
- Hero section: 280px tall (many sites use 500px+)
- Cards have breathing room but don't waste space
- Everything is organized into clear visual hierarchies

**Three-column grid** for intro cards on desktop, stacks nicely on mobile.

---

## Responsive Behavior

**Desktop → Tablet → Mobile**

- Desktop: Full navigation bar, three-column layouts
- Tablet: Two-column grids, slightly tighter spacing
- Mobile: Everything stacks to single column, burger menu appears, icons replace text on action buttons

Always feels appropriate for the screen size - never squished, never wastefully large.

---

## Special Components

### Hero Section
- 280px tall banner at top of Home tab
- Background image support: `images/hero-bg.jpg` (create the folder, add your image)
- Recommended: Wide landscape image (1920x600px), works with warm/gold tones
- Overlay ensures text is always readable

### File Status Indicator
- Bottom-right corner
- Shows current loaded file or warning if none
- Click to minimize to a small square
- Color-coded borders: Gold (default), Green (loaded), Orange (unsaved changes + pulse)

### Timeline (History Tab)
- Vertical gold line down the left
- Each payout is a card with a glowing gold dot on the line
- Expands to show member-by-member breakdown
- Feels like a premium project retrospective

---

## The Emotional Target

When someone uses this web app, they should feel:
- **Confidence** - This looks professional and trustworthy
- **Comfort** - The warm colors and smooth animations are easy on the eyes
- **Clarity** - Everything is organized and makes sense
- **Respect** - The design treats users like professionals, not children

It should feel like using premium financial software, not a toy or a rushed prototype.

---

## Quick Reference: Where Colors Are Used

| Element | Color |
|---------|-------|
| Backgrounds | Deep warm charcoal (#1a1612) |
| Main headings | Light gold (#e6d5a8) |
| Section headings | Platinum silver (#f5f5f5) |
| Body text | Soft white (#f8f9fa) |
| Borders | Champagne gold (#c9a961) |
| Hover glows | Golden glow (rgba 201,169,97) |
| Primary buttons | Gold gradient |
| Secondary buttons | Platinum with transparent fill |
| Load button hover | Teal blue (#5dade2) |
| Success states | Green (#4caf50) |
| Warning states | Orange (#ff9800) |
| Error/Delete | Red (#ff4444) |

---

## If You're Adding New Elements

**Ask yourself:**
1. Does this feel like premium frosted glass? (Use glass-morphism)
2. Does it glow subtly on hover? (Add gold shadow)
3. Does it lift slightly when interacted with? (Add transform: translateY)
4. Are the colors from the established palette? (No random new colors)
5. Does it animate smoothly? (0.25-0.3s transitions)

**If yes to all, you're on brand.**

---

## Hero Background Image Setup

1. Create an `images/` folder in the same directory as `index.html`
2. Place your hero background image as `hero-bg.jpg` in that folder
3. The web app will automatically use it

**Recommended specs:**
- Format: JPG or PNG
- Dimensions: 1920x600px minimum
- Aspect ratio: Wide landscape (16:9 or wider)
- Style: Abstract, professional, or thematic imagery
- Tone: Works best with warm colors, platinum/gold accents

**File structure:**
```
web app/
├── index.html
├── styles.css
├── script.js
├── images/
│   └── hero-bg.jpg  ← Your hero image here
```

The background works on local development and any static hosting (itch.io, GitHub Pages, etc.).

---

**That's it!** The design is Premium Business Platinum - warm, professional, glass-morphism aesthetic with champagne gold accents. Modern luxury without the attitude.
