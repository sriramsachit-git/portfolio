# Design System Document
## Visual Design & UX Specifications

---

## 1. Design Philosophy

The portfolio design embodies a modern, immersive aesthetic that balances technical sophistication with approachability. The visual language communicates expertise in AI/ML while creating an engaging, memorable experience that stands out in a crowded market.

### 1.1 Design Principles

| Principle | Description |
|-----------|-------------|
| **Immersive Experience** | 3D elements and animations create depth and engagement without overwhelming content |
| **Technical Elegance** | Clean, precise aesthetics reflecting engineering discipline |
| **Purposeful Motion** | Every animation serves UX goals, not just decoration |
| **Accessibility First** | Visual appeal never compromises usability |
| **Performance Conscious** | Beauty within performance constraints |

### 1.2 Visual Identity Keywords

- Modern, Cutting-edge, Professional
- Technical, Precise, Sophisticated
- Creative, Innovative, Memorable
- Clean, Minimal, Focused

---

## 2. Color System

### 2.1 Primary Palette (Dark Theme)

| Token | Value | RGB | Usage |
|-------|-------|-----|-------|
| `--bg-primary` | `#0a0a0a` | rgb(10, 10, 10) | Main background |
| `--bg-secondary` | `#111111` | rgb(17, 17, 17) | Cards, elevated surfaces |
| `--bg-tertiary` | `#1a1a2e` | rgb(26, 26, 46) | Hover states, subtle backgrounds |
| `--bg-elevated` | `#16213e` | rgb(22, 33, 62) | Modals, dropdowns |

### 2.2 Text Colors

| Token | Value | RGB | Usage |
|-------|-------|-----|-------|
| `--text-primary` | `#ffffff` | rgb(255, 255, 255) | Headings, primary text |
| `--text-secondary` | `#a0a0a0` | rgb(160, 160, 160) | Body text, descriptions |
| `--text-muted` | `#666666` | rgb(102, 102, 102) | Captions, metadata |
| `--text-disabled` | `#444444` | rgb(68, 68, 68) | Disabled states |

### 2.3 Accent Colors

| Token | Value | RGB | Usage |
|-------|-------|-----|-------|
| `--accent-primary` | `#6366f1` | rgb(99, 102, 241) | Primary accent (Indigo) |
| `--accent-secondary` | `#22d3ee` | rgb(34, 211, 238) | Secondary accent (Cyan) |
| `--accent-tertiary` | `#a855f7` | rgb(168, 85, 247) | Tertiary accent (Purple) |

### 2.4 Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--success` | `#22c55e` | Success states, confirmations |
| `--warning` | `#f59e0b` | Warnings, cautions |
| `--error` | `#ef4444` | Errors, destructive actions |
| `--info` | `#3b82f6` | Informational messages |

### 2.5 Gradient Definitions

```css
/* Primary gradient - buttons, accents */
--gradient-primary: linear-gradient(135deg, #6366f1 0%, #22d3ee 100%);

/* Subtle gradient - cards, backgrounds */
--gradient-subtle: linear-gradient(180deg, rgba(26,26,46,0.8) 0%, rgba(10,10,10,0.95) 100%);

/* Glow effect - hover states */
--gradient-glow: radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%);

/* Text gradient */
--gradient-text: linear-gradient(90deg, #6366f1, #22d3ee, #a855f7);

/* Mesh gradient - hero background */
--gradient-mesh: radial-gradient(at 40% 20%, #6366f1 0px, transparent 50%),
                 radial-gradient(at 80% 0%, #22d3ee 0px, transparent 50%),
                 radial-gradient(at 0% 50%, #a855f7 0px, transparent 50%);
```

### 2.6 CSS Variables Declaration

```scss
:root {
  // Backgrounds
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-tertiary: #1a1a2e;
  --bg-elevated: #16213e;
  
  // Text
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --text-muted: #666666;
  
  // Accents
  --accent-primary: #6366f1;
  --accent-secondary: #22d3ee;
  --accent-tertiary: #a855f7;
  
  // Gradients
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #22d3ee 100%);
}
```

---

## 3. Typography System

### 3.1 Font Families

| Purpose | Font | Fallback | Source |
|---------|------|----------|--------|
| **Display/Headings** | Space Grotesk | system-ui, sans-serif | Google Fonts |
| **Body Text** | Inter | system-ui, sans-serif | Google Fonts |
| **Code/Technical** | JetBrains Mono | monospace | Google Fonts |

### 3.2 Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

### 3.3 Type Scale

| Element | Desktop Size | Mobile Size | Weight | Line Height | Letter Spacing |
|---------|--------------|-------------|--------|-------------|----------------|
| Hero Title | `clamp(4rem, 10vw, 8rem)` | 3rem | 700 | 1.0 | -0.02em |
| H1 | 3.5rem (56px) | 2.5rem | 700 | 1.1 | -0.02em |
| H2 | 2.5rem (40px) | 2rem | 600 | 1.2 | -0.01em |
| H3 | 1.75rem (28px) | 1.5rem | 600 | 1.3 | 0 |
| H4 | 1.25rem (20px) | 1.125rem | 600 | 1.4 | 0 |
| Body Large | 1.25rem (20px) | 1.125rem | 400 | 1.6 | 0 |
| Body | 1rem (16px) | 1rem | 400 | 1.6 | 0 |
| Body Small | 0.875rem (14px) | 0.875rem | 400 | 1.5 | 0 |
| Caption | 0.75rem (12px) | 0.75rem | 400 | 1.4 | 0.01em |
| Code | 0.875rem (14px) | 0.8125rem | 400 | 1.5 | 0 |

### 3.4 Typography CSS

```scss
// Font families
--font-display: 'Space Grotesk', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

// Font sizes
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
--text-5xl: 3rem;
--text-6xl: 3.75rem;
--text-7xl: 4.5rem;
--text-hero: clamp(4rem, 10vw, 8rem);

// Font weights
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 4. Spacing System

### 4.1 Base Unit

Base unit: **8px**. All spacing uses multiples of the base unit for visual consistency.

### 4.2 Spacing Scale

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--space-0` | 0 | 0px | Reset |
| `--space-1` | 0.25rem | 4px | Tight spacing |
| `--space-2` | 0.5rem | 8px | Compact elements |
| `--space-3` | 0.75rem | 12px | Small gaps |
| `--space-4` | 1rem | 16px | Default spacing |
| `--space-5` | 1.25rem | 20px | Medium gaps |
| `--space-6` | 1.5rem | 24px | Section padding |
| `--space-8` | 2rem | 32px | Large gaps |
| `--space-10` | 2.5rem | 40px | Component spacing |
| `--space-12` | 3rem | 48px | Section gaps |
| `--space-16` | 4rem | 64px | Large sections |
| `--space-20` | 5rem | 80px | Hero spacing |
| `--space-24` | 6rem | 96px | Section padding (mobile) |
| `--space-32` | 8rem | 128px | Section padding (desktop) |

### 4.3 Section Spacing

```scss
// Section padding
--section-padding-y: clamp(5rem, 10vh, 8rem);
--section-padding-x: clamp(1.5rem, 5vw, 4rem);

// Container
--container-max: 1280px;
--container-padding: var(--space-6);
```

---

## 5. Layout System

### 5.1 Container Widths

| Token | Value | Usage |
|-------|-------|-------|
| `--container-sm` | 640px | Small content |
| `--container-md` | 768px | Medium content |
| `--container-lg` | 1024px | Large content |
| `--container-xl` | 1280px | Default max-width |
| `--container-2xl` | 1536px | Wide screens |

### 5.2 Grid System

```scss
// 12-column grid
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}

// Common layouts
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

// Responsive
@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

### 5.3 Section Layout

```scss
.section {
  min-height: 100vh;
  padding: var(--section-padding-y) var(--section-padding-x);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
```

---

## 6. Animation Specifications

### 6.1 Timing Functions (Easings)

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary easing, entrances |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | Smooth exits |
| `--ease-in-out-quart` | `cubic-bezier(0.76, 0, 0.24, 1)` | Bidirectional motion |
| `--ease-out-back` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful overshoot |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Bouncy feel |

### 6.2 Duration Standards

| Type | Duration | Usage |
|------|----------|-------|
| **Micro** | 100-150ms | Button hover, focus states |
| **Fast** | 200-300ms | Tooltips, dropdowns |
| **Normal** | 300-400ms | Standard transitions |
| **Slow** | 500-600ms | Modal opens, page transitions |
| **Dramatic** | 800-1200ms | Scroll reveals, hero animations |

### 6.3 Animation Patterns

#### Text Reveal Animation

```javascript
// Split text and animate characters
gsap.from('.reveal-text .char', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.02,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.reveal-text',
    start: 'top 80%',
  }
});
```

#### Fade Up Animation

```javascript
gsap.from('.fade-up', {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.fade-up',
    start: 'top 85%',
  }
});
```

#### Stagger Animation

```javascript
gsap.from('.stagger-item', {
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power2.out',
});
```

#### Parallax Effect

```javascript
gsap.to('.parallax-element', {
  y: -100,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  }
});
```

### 6.4 CSS Keyframe Animations

```scss
// Fade in up
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Pulse glow
@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
  }
}

// Float
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

// Rotate
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

---

## 7. 3D Design Specifications

### 7.1 Hero 3D Element Options

**⚠️ Important: Do NOT use 3D emoji/avatar character. Choose from these alternatives:**

#### Option A: Neural Network Particle System
```
- Particle count: 5,000-10,000 particles
- Particle size: 2-4px
- Colors: Gradient from accent-primary to accent-secondary
- Behavior:
  - Particles form interconnected nodes
  - React to mouse movement with displacement
  - Connecting lines between nearby particles (distance < 100px)
  - Line opacity falls off with distance
  - Gentle drift animation
```

#### Option B: Abstract Geometric Composition
```
- Objects: 5-8 floating geometries
  - Torus knots
  - Icosahedrons
  - Dodecahedrons
  - Custom geometries
- Material: Glass/crystalline with environment reflections
- Animation:
  - Gentle rotation (0.001 rad/frame)
  - Floating up/down (sin wave)
  - Parallax on mouse move
- Colors: Accent colors with metallic/glass finish
```

#### Option C: Morphing Organic Blob
```
- Base geometry: Sphere with high subdivision
- Displacement: Perlin noise
- Material: Iridescent/holographic shader
- Animation:
  - Continuous morphing
  - Reacts to scroll position
  - Mouse proximity influence
- Colors: Shifting gradient (accent colors)
```

#### Option D: Data Visualization / Tech Elements
```
- Elements: Floating code symbols, brackets, data nodes
- Material: Emissive with glow
- Animation:
  - Orbit around central point
  - Text/code streaming effects
- Colors: Matrix green (#22d3ee) or accent gradient
```

### 7.2 Lighting Setup

```javascript
// Three.js lighting configuration
<>
  {/* Ambient - Base illumination */}
  <ambientLight intensity={0.5} color="#fff5e6" />
  
  {/* Main directional - Key light */}
  <directionalLight 
    position={[5, 5, 5]} 
    intensity={1} 
    castShadow 
  />
  
  {/* Fill light - Soften shadows */}
  <directionalLight 
    position={[-5, 0, -5]} 
    intensity={0.3} 
  />
  
  {/* Rim/accent light - Edge glow */}
  <pointLight 
    position={[0, 5, -5]} 
    intensity={0.5} 
    color="#6366f1" 
  />
</>
```

### 7.3 Post-Processing Effects

```javascript
<EffectComposer>
  <Bloom 
    luminanceThreshold={0.5}
    luminanceSmoothing={0.9}
    intensity={0.5}
  />
  <ChromaticAberration offset={[0.001, 0.001]} />
  <Vignette eskil={false} offset={0.1} darkness={0.5} />
</EffectComposer>
```

---

## 8. Component Specifications

### 8.1 Navigation Bar

```
Layout:
├── Logo (left)
├── Nav Links (center/right on desktop)
└── Hamburger Menu (right on mobile)

Dimensions:
- Height: 80px (desktop), 64px (mobile)
- Padding: 0 var(--section-padding-x)

States:
- Default: transparent background
- Scrolled: blur(10px) + bg-primary/80
- Hidden: translateY(-100%)

Behavior:
- Hide on scroll down
- Show on scroll up
- Always show at top
```

**CSS:**

```scss
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 100;
  transition: transform 0.3s var(--ease-out-quart),
              background 0.3s var(--ease-out-quart);
  
  &.scrolled {
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(10px);
  }
  
  &.hidden {
    transform: translateY(-100%);
  }
}
```

### 8.2 Project Cards

```
Dimensions:
- Aspect ratio: 16:9 or 4:3
- Border radius: 16px
- Padding: 24px

Content:
├── Thumbnail image (cover)
├── Title (H3)
├── Tech stack tags
├── Description (truncated)
└── Links (Demo, GitHub)

States:
- Default: bg-secondary
- Hover: scale(1.02), elevation increase, glow
- Focus: accent border

3D Effect:
- Perspective: 1000px
- Max rotation: 5deg on X and Y
- Follow mouse position
```

**CSS:**

```scss
.project-card {
  position: relative;
  background: var(--bg-secondary);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s var(--ease-out-quart),
              box-shadow 0.3s var(--ease-out-quart);
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
                0 0 60px rgba(99, 102, 241, 0.1);
  }
}
```

### 8.3 Buttons

#### Primary Button

```scss
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: var(--gradient-primary);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, filter 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
  
  &:active {
    transform: translateY(0);
  }
}
```

#### Secondary Button

```scss
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: transparent;
  color: var(--text-secondary);
  font-weight: 600;
  border: 1px solid var(--text-muted);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  
  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }
}
```

### 8.4 Custom Cursor

```
States:
- Default: 12px circle, accent-primary
- Hover (interactive): 40px hollow ring
- Click: scale down to 8px
- Text: vertical bar

Behavior:
- Lerp follow (0.1 smoothing)
- Mix-blend-mode: difference
- Hide on mobile/touch

Optional:
- Particle trail
- Motion blur
```

**Implementation:**

```scss
.cursor {
  position: fixed;
  width: 12px;
  height: 12px;
  background: var(--accent-primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: transform 0.15s var(--ease-out-quart);
  
  &.hover {
    width: 40px;
    height: 40px;
    background: transparent;
    border: 2px solid var(--accent-primary);
  }
}
```

### 8.5 Form Inputs

```scss
.input {
  width: 100%;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--bg-tertiary);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
}
```

---

## 9. Responsive Design

### 9.1 Breakpoints

| Name | Width | Description |
|------|-------|-------------|
| `xs` | < 480px | Small phones |
| `sm` | 480-640px | Large phones |
| `md` | 640-768px | Small tablets |
| `lg` | 768-1024px | Tablets, small laptops |
| `xl` | 1024-1280px | Laptops |
| `2xl` | > 1280px | Desktops |

### 9.2 SCSS Mixins

```scss
@mixin xs { @media (max-width: 479px) { @content; } }
@mixin sm { @media (min-width: 480px) { @content; } }
@mixin md { @media (min-width: 640px) { @content; } }
@mixin lg { @media (min-width: 768px) { @content; } }
@mixin xl { @media (min-width: 1024px) { @content; } }
@mixin xxl { @media (min-width: 1280px) { @content; } }
```

### 9.3 Responsive Adaptations

| Breakpoint | Adaptations |
|------------|-------------|
| **Mobile** (< 640px) | Single column, hamburger menu, reduced 3D complexity, touch-optimized targets (44px min) |
| **Tablet** (640-1024px) | 2-column grid, medium 3D complexity, simplified animations |
| **Desktop** (> 1024px) | Full experience, 3-column grid, custom cursor, full 3D effects |

### 9.4 Mobile-Specific Considerations

```scss
// Touch-friendly targets
.touch-target {
  min-width: 44px;
  min-height: 44px;
}

// Disable hover effects on touch
@media (hover: none) {
  .hover-effect:hover {
    transform: none;
  }
}

// Reduced motion
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Accessibility Guidelines

### 10.1 Color Contrast

| Element | Minimum Ratio | Our Ratio |
|---------|---------------|-----------|
| Body text | 4.5:1 | 7.2:1 (#a0a0a0 on #0a0a0a) |
| Large text | 3:1 | 21:1 (#ffffff on #0a0a0a) |
| UI components | 3:1 | 4.8:1 (accent on bg) |

### 10.2 Focus States

```scss
// Visible focus indicator
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

// Remove default for styled elements
button:focus:not(:focus-visible) {
  outline: none;
}
```

### 10.3 Screen Reader Support

```html
<!-- Skip link -->
<a href="#main" class="skip-link">Skip to main content</a>

<!-- ARIA labels -->
<canvas aria-label="3D animated background" role="img"></canvas>

<!-- Live regions -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  <!-- Form submission messages -->
</div>
```

### 10.4 Reduced Motion

```scss
@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none !important;
    transition: none !important;
  }
  
  // Fallback for 3D elements
  .canvas-3d {
    display: none;
  }
  
  .static-fallback {
    display: block;
  }
}
```

### 10.5 Keyboard Navigation

- All interactive elements must be focusable
- Tab order follows visual order
- Modal focus trapping
- Escape key closes overlays
- Arrow keys for navigation menus

---

## 11. Assets & Resources

### 11.1 Image Specifications

| Type | Format | Max Size | Dimensions |
|------|--------|----------|------------|
| Hero images | WebP/AVIF | 200KB | 1920x1080 |
| Project thumbnails | WebP | 100KB | 800x600 |
| Profile photo | WebP | 50KB | 400x400 |
| Icons | SVG | 5KB | 24x24 |

### 11.2 3D Model Specifications

| Type | Format | Max Size | Notes |
|------|--------|----------|-------|
| GLB models | .glb | 500KB | Draco compressed |
| Textures | .ktx2 | 200KB | Basis compressed |
| HDR environment | .hdr | 1MB | Compressed |

### 11.3 Icon Library

Use Lucide React for consistent iconography:

```bash
npm install lucide-react
```

Common icons:
- `ArrowRight`, `ArrowUpRight` - Links
- `Github`, `Linkedin`, `Twitter` - Social
- `Mail`, `MapPin` - Contact
- `Download` - Resume
- `Menu`, `X` - Navigation
- `ExternalLink` - External links

---

## 12. Design Tokens Export

### 12.1 Complete CSS Variables

```scss
:root {
  // Colors
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-tertiary: #1a1a2e;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --text-muted: #666666;
  --accent-primary: #6366f1;
  --accent-secondary: #22d3ee;
  
  // Typography
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  // Spacing
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  
  // Animation
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  
  // Layout
  --container-max: 1280px;
  --section-padding-y: clamp(5rem, 10vh, 8rem);
  --section-padding-x: clamp(1.5rem, 5vw, 4rem);
  
  // Borders
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  // Shadows
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-glow: 0 0 30px rgba(99, 102, 241, 0.3);
}
```

---

## 13. Job Hunt Optimization

### 13.1 Recruiter-Focused Design Decisions

Recruiters spend 30-60 seconds on initial portfolio review. Every design decision should optimize for quick comprehension:

| Element | Design Decision | Why It Works |
|---------|-----------------|--------------|
| **Hero** | Name + Title visible instantly | No scrolling needed for identity |
| **Skills** | Visual tags, not paragraphs | Scannable in 5 seconds |
| **Projects** | 3-6 featured projects max | Quality over quantity |
| **Contact** | Sticky CTA or fixed button | Always accessible |
| **Resume** | One-click download | Reduce friction |

### 13.2 FAANG-Specific Considerations

| Company | What They Value | Design Emphasis |
|---------|-----------------|-----------------|
| **Google** | Problem-solving, scale | Show metrics, data visualizations |
| **Meta** | Impact, collaboration | Team projects, user impact numbers |
| **Amazon** | Customer obsession, ownership | Customer-facing projects, outcomes |
| **Apple** | Design excellence, polish | Pixel-perfect attention to detail |
| **Netflix** | Innovation, autonomy | Unique projects, creative solutions |
| **Microsoft** | Breadth, enterprise | Diverse tech stack, scalability |

### 13.3 Must-Have Above the Fold

Within the first viewport (no scrolling), include:

```
┌─────────────────────────────────────────────┐
│  [Logo/Name]              [Nav] [Resume ↓]  │
│                                             │
│         SRIRAM                              │
│         AI Engineer & Data Scientist        │
│                                             │
│    [3D Visual Element - NOT emoji]          │
│                                             │
│  Building intelligent systems that scale    │
│                                             │
│  [View Projects]  [Contact Me]              │
│                                             │
│            ↓ Scroll                         │
└─────────────────────────────────────────────┘
```

### 13.4 Social Proof Elements

Include these for credibility:

- [ ] Company logos you've worked with/for
- [ ] GitHub contribution graph or stats
- [ ] Project metrics (users, accuracy, performance)
- [ ] Certifications or notable achievements
- [ ] Testimonials (if available)

### 13.5 SEO for Recruiters

Recruiters often Google candidates. Optimize for:

```html
<title>Sriram | AI Engineer & Data Scientist</title>
<meta name="description" content="AI Engineer specializing in machine learning, 
  NLP, and scalable ML systems. Based in San Diego, CA. Open to opportunities.">
<meta name="keywords" content="AI Engineer, Machine Learning, Data Scientist, 
  Python, TensorFlow, PyTorch, San Diego">
```

### 13.6 Call-to-Action Strategy

| Location | CTA | Purpose |
|----------|-----|---------|
| Hero | "View My Work" | Engage immediately |
| Navigation | "Resume" button | Always visible download |
| Projects | "Live Demo" / "GitHub" | Demonstrate work |
| After Projects | "Let's Work Together" | Capture interest |
| Footer | Email + LinkedIn | Multiple contact options |

### 13.7 Mobile Optimization for Recruiters

40%+ of recruiters first view portfolios on mobile:

- [ ] Tap targets minimum 44x44px
- [ ] Resume downloads work on mobile
- [ ] 3D elements gracefully degrade
- [ ] Contact form is thumb-friendly
- [ ] Load time < 3s on 4G

---

## Appendix: Design Checklist

### Pre-Development
- [ ] Color palette finalized
- [ ] Typography scale confirmed
- [ ] 3D element option selected
- [ ] All content ready

### Development
- [ ] CSS variables implemented
- [ ] Responsive breakpoints tested
- [ ] Animation performance verified
- [ ] Accessibility audit passed

### Launch
- [ ] Cross-browser testing complete
- [ ] Performance budget met
- [ ] Mobile experience optimized
- [ ] Reduced motion support verified
