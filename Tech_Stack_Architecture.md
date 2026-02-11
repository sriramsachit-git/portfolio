# Technical Architecture Document
## 3D Portfolio Website - Tech Stack & Architecture

---

## 1. Technology Stack Overview

This document defines the complete technical architecture for the 3D portfolio website, including frameworks, libraries, tooling, and infrastructure decisions.

### 1.1 Core Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | React | 18.2+ | UI component library with hooks and concurrent features |
| **Language** | TypeScript | 5.0+ | Type safety, better DX, refactoring support |
| **Build Tool** | Vite | 5.0+ | Fast HMR, optimized builds, ES modules |
| **3D Graphics** | Three.js | 0.160+ | WebGL abstraction for 3D rendering |
| **React 3D** | React Three Fiber | 8.15+ | React renderer for Three.js |
| **3D Utilities** | @react-three/drei | 9.90+ | Helpers: OrbitControls, Environment, Text, etc. |
| **Post-processing** | @react-three/postprocessing | 2.15+ | Bloom, depth of field, visual effects |
| **Animation** | GSAP | 3.12+ | Professional-grade animation library |
| **Scroll Animation** | GSAP ScrollTrigger | 3.12+ | Scroll-based animation triggers (free) |
| **Smooth Scroll** | Lenis | 1.0+ | Smooth scrolling (free alternative to ScrollSmoother) |
| **Text Animation** | Splitting.js | 1.0+ | Text splitting (free alternative to SplitText) |
| **Styling** | SCSS Modules | - | Scoped styles, variables, nesting |

---

## 2. Package Dependencies

### 2.1 Production Dependencies

```bash
# Core React
npm install react react-dom

# TypeScript
npm install typescript

# 3D Graphics
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing

# Animation
npm install gsap lenis splitting

# Utilities
npm install clsx
```

**Full package.json dependencies:**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.90.0",
    "@react-three/postprocessing": "^2.15.0",
    "gsap": "^3.12.0",
    "lenis": "^1.0.0",
    "splitting": "^1.0.6",
    "clsx": "^2.0.0"
  }
}
```

### 2.2 Development Dependencies

```bash
npm install -D typescript @types/react @types/react-dom @types/three
npm install -D vite @vitejs/plugin-react
npm install -D sass
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D prettier eslint-config-prettier
npm install -D @types/node
```

**Full devDependencies:**

```json
{
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/three": "^0.160.0",
    "@types/node": "^20.0.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "sass": "^1.69.0",
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.13.0",
    "@typescript-eslint/parser": "^6.13.0",
    "prettier": "^3.1.0",
    "eslint-config-prettier": "^9.1.0"
  }
}
```

### 2.3 Optional GSAP Club Plugins

If you have a GSAP Club membership ($99/year), you can use these premium plugins:

| Plugin | Purpose | Free Alternative |
|--------|---------|------------------|
| ScrollSmoother | Buttery smooth scrolling with parallax | Lenis |
| SplitText | Advanced text splitting and animation | Splitting.js |
| MorphSVG | SVG morphing animations | - |
| DrawSVG | SVG path drawing animations | Manual implementation |
| MotionPath | Animation along paths | - |

**Installation with Club plugins:**

```bash
# Add to .npmrc
//npm.greensock.com/:_authToken=YOUR_TOKEN

# Install
npm install gsap@npm:@gsap/shockingly
```

---

## 3. Project Architecture

### 3.1 Directory Structure

```
portfolio/
├── public/
│   ├── models/                 # 3D models (.glb, .gltf)
│   │   └── scene.glb
│   ├── textures/               # Texture images
│   │   ├── matcap.png
│   │   └── environment.hdr
│   ├── fonts/                  # Custom fonts (.woff2)
│   │   ├── SpaceGrotesk.woff2
│   │   └── Inter.woff2
│   ├── images/                 # Static images
│   │   ├── projects/
│   │   └── profile.jpg
│   ├── resume.pdf
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── Canvas/
│   │   │   ├── Canvas.tsx      # R3F canvas wrapper
│   │   │   └── Canvas.module.scss
│   │   │
│   │   ├── Scene/
│   │   │   ├── Scene.tsx       # Main 3D scene
│   │   │   ├── Particles.tsx   # Particle system
│   │   │   ├── Geometry.tsx    # Floating geometries
│   │   │   └── Lighting.tsx    # Scene lighting
│   │   │
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   └── Hero.module.scss
│   │   │
│   │   ├── About/
│   │   │   ├── About.tsx
│   │   │   └── About.module.scss
│   │   │
│   │   ├── Projects/
│   │   │   ├── Projects.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── Projects.module.scss
│   │   │
│   │   ├── Skills/
│   │   │   ├── Skills.tsx
│   │   │   └── Skills.module.scss
│   │   │
│   │   ├── Contact/
│   │   │   ├── Contact.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── Contact.module.scss
│   │   │
│   │   ├── Navigation/
│   │   │   ├── Navigation.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Navigation.module.scss
│   │   │
│   │   ├── Cursor/
│   │   │   ├── Cursor.tsx
│   │   │   └── Cursor.module.scss
│   │   │
│   │   ├── Loader/
│   │   │   ├── Loader.tsx
│   │   │   └── Loader.module.scss
│   │   │
│   │   └── UI/
│   │       ├── Button.tsx
│   │       ├── SectionTitle.tsx
│   │       └── ScrollIndicator.tsx
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   ├── useMousePosition.ts
│   │   ├── useSmoothScroll.ts
│   │   ├── useMediaQuery.ts
│   │   └── useIntersectionObserver.ts
│   │
│   ├── utils/
│   │   ├── animations.ts       # GSAP animation utilities
│   │   ├── three-utils.ts      # Three.js helpers
│   │   ├── math.ts             # Math utilities (lerp, clamp)
│   │   └── cn.ts               # Classname utility
│   │
│   ├── styles/
│   │   ├── globals.scss        # Global styles
│   │   ├── variables.scss      # CSS custom properties
│   │   ├── mixins.scss         # SCSS mixins
│   │   ├── typography.scss     # Font definitions
│   │   └── animations.scss     # Keyframe animations
│   │
│   ├── data/
│   │   ├── projects.ts         # Project data
│   │   ├── skills.ts           # Skills data
│   │   └── config.ts           # Site configuration
│   │
│   ├── types/
│   │   ├── project.ts
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
└── package.json
```

### 3.2 Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                           App                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Smooth Scroll (Lenis)                ││
│  │  ┌─────────────────────┐  ┌───────────────────────────┐││
│  │  │                     │  │                           │││
│  │  │   WebGL Layer       │  │      DOM Layer            │││
│  │  │   (Canvas)          │  │                           │││
│  │  │                     │  │  ┌─────────────────────┐  │││
│  │  │  ┌───────────────┐  │  │  │    Navigation       │  │││
│  │  │  │    Scene      │  │  │  └─────────────────────┘  │││
│  │  │  │  - Particles  │  │  │  ┌─────────────────────┐  │││
│  │  │  │  - Geometry   │  │  │  │    Hero Section     │  │││
│  │  │  │  - Lighting   │  │  │  └─────────────────────┘  │││
│  │  │  │  - Effects    │  │  │  ┌─────────────────────┐  │││
│  │  │  └───────────────┘  │  │  │    About Section    │  │││
│  │  │                     │  │  └─────────────────────┘  │││
│  │  │                     │  │  ┌─────────────────────┐  │││
│  │  │                     │  │  │   Projects Section  │  │││
│  │  │                     │  │  └─────────────────────┘  │││
│  │  │                     │  │  ┌─────────────────────┐  │││
│  │  │                     │  │  │   Contact Section   │  │││
│  │  │                     │  │  └─────────────────────┘  │││
│  │  │                     │  │  ┌─────────────────────┐  │││
│  │  │                     │  │  │      Footer         │  │││
│  │  │                     │  │  └─────────────────────┘  │││
│  │  └─────────────────────┘  └───────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   Overlay Components                     ││
│  │              (Cursor, Loader, Mobile Menu)              ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Configuration Files

### 4.1 Vite Configuration (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['gsap'],
        },
      },
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr'],
});
```

### 4.2 TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@styles/*": ["src/styles/*"],
      "@data/*": ["src/data/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 4.3 ESLint Configuration (.eslintrc.cjs)

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
```

---

## 5. Performance Optimization

### 5.1 Three.js/R3F Optimization

```typescript
// Canvas configuration for optimal performance
<Canvas
  camera={{ position: [0, 0, 5], fov: 75 }}
  gl={{
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    stencil: false,
    depth: true,
  }}
  dpr={[1, 2]} // Limit pixel ratio
  performance={{ min: 0.5 }} // Allow frame rate throttling
>
```

**Key optimizations:**

| Technique | Implementation | Impact |
|-----------|----------------|--------|
| DPR Limiting | `dpr={[1, 2]}` | Prevents 4K rendering overhead |
| Frustum Culling | Automatic in R3F | Skips off-screen objects |
| Instanced Meshes | `<Instances>` component | Reduces draw calls |
| LOD (Level of Detail) | `<Detailed>` component | Simpler geometry at distance |
| Texture Compression | KTX2/Basis format | 75% size reduction |
| Geometry Disposal | `useEffect` cleanup | Prevents memory leaks |

### 5.2 Animation Performance

```typescript
// GSAP optimization settings
gsap.config({
  force3D: true, // Force GPU acceleration
  nullTargetWarn: false,
});

// Use will-change sparingly
.animated-element {
  will-change: transform, opacity;
}

// Remove will-change after animation
gsap.to(element, {
  onComplete: () => {
    element.style.willChange = 'auto';
  }
});
```

### 5.3 Bundle Optimization

```typescript
// Lazy load heavy components
const Projects = lazy(() => import('@components/Projects/Projects'));
const Contact = lazy(() => import('@components/Contact/Contact'));

// Dynamic import for 3D models
const loadModel = async () => {
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader');
  // ...
};
```

### 5.4 Asset Optimization Checklist

- [ ] Compress 3D models with Draco/Meshopt
- [ ] Convert textures to WebP/AVIF
- [ ] Use `loading="lazy"` for images
- [ ] Preload critical fonts
- [ ] Implement service worker for caching
- [ ] Use CDN for static assets

---

## 6. Deployment (Recommended: Vercel)

### 6.1 Why Vercel for Your Portfolio

For a job-hunting portfolio targeting FAANG companies, **Vercel is the best free option**:

| Factor | Vercel Advantage | Impact on Job Hunt |
|--------|------------------|-------------------|
| **Speed** | Edge CDN, sub-100ms TTFB | Recruiters won't bounce |
| **Uptime** | 99.99% availability | Always online for opportunities |
| **DX** | Built for React/Vite | Deploy in 2 minutes |
| **Free SSL** | Automatic HTTPS | Looks professional, secure |
| **Analytics** | Built-in visitor tracking | Know when recruiters visit |
| **Preview URLs** | Per-commit deployments | Test before going live |

### 6.2 Vercel Deployment (Step-by-Step)

#### Option A: GitHub Integration (Recommended)

```bash
# 1. Initialize git and push to GitHub
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main

# 2. Go to vercel.com
# 3. Click "Add New Project"
# 4. Import your GitHub repository
# 5. Vercel auto-detects Vite settings:
#    - Framework Preset: Vite
#    - Build Command: npm run build
#    - Output Directory: dist
# 6. Click "Deploy"
```

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# Production deploy
vercel --prod
```

### 6.3 Vercel Configuration

Create `vercel.json` in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/((?!assets/).*)",
      "destination": "/index.html"
    }
  ]
}
```

### 6.4 Custom Domain Setup

**Recommended domains for AI Engineer portfolio:**

| Domain | Cost/Year | Pros |
|--------|-----------|------|
| `sriram.dev` | ~$12 | Best for developers, affordable |
| `sriram.ai` | ~$70 | Perfect for AI focus |
| `sriram.io` | ~$35 | Tech-savvy impression |

**Setup steps:**

1. Buy domain from Namecheap, Google Domains, or Cloudflare
2. In Vercel Dashboard → Project → Settings → Domains
3. Add your domain (e.g., `sriram.dev`)
4. Update DNS records as shown by Vercel:
   - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`
5. Wait 5-10 minutes for SSL certificate

### 6.5 Environment Variables on Vercel

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Purpose |
|----------|---------|
| `VITE_GA_TRACKING_ID` | Google Analytics tracking |
| `VITE_EMAILJS_SERVICE_ID` | Contact form emails |
| `VITE_EMAILJS_TEMPLATE_ID` | Email template |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS authentication |

### 6.6 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify 3D elements render on mobile
- [ ] Test contact form submission
- [ ] Check Lighthouse score (aim for 80+)
- [ ] Verify custom domain SSL is active
- [ ] Add site to Google Search Console
- [ ] Update LinkedIn/Resume with portfolio URL

### 6.7 Free Hosting Alternatives

If Vercel doesn't work for you:

| Platform | Bandwidth | Best For |
|----------|-----------|----------|
| **Netlify** | 100GB/mo | Built-in form handling |
| **Cloudflare Pages** | Unlimited | Highest traffic sites |
| **GitHub Pages** | 100GB/mo | Simplest setup |

---

## 7. Browser Support

| Browser | Version | Support Level | Notes |
|---------|---------|---------------|-------|
| Chrome | 90+ | Full | Primary development browser |
| Firefox | 88+ | Full | Test regularly |
| Safari | 14+ | Full | WebGL2 required |
| Edge | 90+ | Full | Chromium-based |
| Mobile Safari | 14+ | Reduced 3D | Lower particle count |
| Chrome Android | Latest | Reduced 3D | Lower particle count |
| Samsung Internet | 15+ | Reduced 3D | Test on real devices |

### WebGL Fallback

```typescript
// Check WebGL support
const checkWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

// Render fallback for non-WebGL browsers
{hasWebGL ? <Canvas3D /> : <StaticBackground />}
```

---

## 8. Testing Strategy

### 8.1 Testing Stack

| Type | Tool | Purpose |
|------|------|---------|
| Unit Tests | Vitest + React Testing Library | Component logic |
| Visual Regression | Chromatic | UI consistency |
| Performance | Lighthouse CI | Performance budgets |
| E2E | Playwright | Critical user flows |
| Accessibility | axe-core | A11y compliance |

### 8.2 Test Commands

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "lighthouse": "lhci autorun"
  }
}
```

### 8.3 Lighthouse CI Configuration

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4173/'],
      startServerCommand: 'npm run preview',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

---

## 9. Development Workflow

### 9.1 Getting Started

```bash
# Clone and install
git clone https://github.com/username/portfolio.git
cd portfolio
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### 9.2 Git Workflow

```bash
# Feature branch workflow
git checkout -b feature/hero-section
# ... make changes ...
git add .
git commit -m "feat: implement hero section with 3D particles"
git push origin feature/hero-section
# Create PR on GitHub
```

### 9.3 Commit Convention

```
feat: new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code restructure
perf: performance improvement
test: tests
chore: maintenance
```

---

## 10. Monitoring & Analytics

### 10.1 Analytics Setup

```typescript
// Google Analytics 4
import ReactGA from 'react-ga4';

ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);

// Track page views
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

// Track events
ReactGA.event({
  category: 'Projects',
  action: 'Click',
  label: projectName,
});
```

### 10.2 Performance Monitoring

- **Vercel Analytics**: Real user monitoring (RUM)
- **Sentry**: Error tracking and performance monitoring
- **Web Vitals**: Core Web Vitals tracking

```typescript
// Web Vitals reporting
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```
