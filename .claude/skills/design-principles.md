# Skill: Design Principles & 2026 Best Practices

Reference guide for modern frontend and visual design patterns used in this project, aligned with 2026 professional design firm standards.

## Usage
```
/design-principles
```

---

## Tech Stack

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| Framework | React | 18.3 | Functional components only |
| Language | TypeScript | 5.7 | Strict mode enabled |
| Bundler | Vite | 6.0 | Fast HMR, ESM native |
| Styling | Tailwind CSS | 3.4 | Utility-first |
| Animation | GSAP | 3.12 | Complex timelines |
| Motion | Framer Motion | 11.15 | Declarative React animations |
| 3D | Three.js + R3F | 0.182 / 8.18 | WebGL rendering |

---

## 2026 Animation Trends

### Library Selection
- **GSAP** - Industry standard for complex timelines, bulletproof cross-browser
- **Motion (Framer Motion)** - Fastest-growing React library, better tree-shaking
- **CSS Keyframes** - Simple state transitions (hover, fade)
- Use GSAP for presentation timelines, Motion for component-level interactions

### Animation Patterns
```tsx
// Imperative GSAP with animation guard
const containerRef = useRef<HTMLDivElement>(null)
const hasAnimated = useRef(false)

useEffect(() => {
  if (!active || !containerRef.current || hasAnimated.current) return
  hasAnimated.current = true

  const el = containerRef.current.querySelector('.target')
  gsap.fromTo(el,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
  )
}, [active])

// Reset when deactivated
useEffect(() => {
  if (!active) hasAnimated.current = false
}, [active])
```

### Performance-Safe Properties
Only animate these (GPU-accelerated):
- `transform` (translate, scale, rotate, skew)
- `opacity`
- `filter`
- `clip-path`

**Avoid:** `width`, `height`, `margin`, `padding`, `color` (trigger layout/paint)

### Modern Principles
- **Stagger entries** - `stagger: 0.1` for visual rhythm
- **Ease functions** - `power2.out` entrances, `back.out(1.4)` for playful pops
- **Duration** - 0.3-0.8s UI, 1-2s hero elements
- **Intentional imperfection** - Subtle wobble, handmade feel valued over sterile perfection
- **Scroll-triggered** - Use IntersectionObserver or GSAP ScrollTrigger
- **Respect `prefers-reduced-motion`** - Accessibility requirement

---

## 2026 Visual Design Trends

### Color Philosophy
```
Primary:    Cyan    (#22d3ee)   - Tech, clarity
Secondary:  Violet  (#a78bfa)   - Premium, creative
Accent:     Emerald (#34d399)   - Success, growth
Warning:    Amber   (#fbbf24)   - Attention
Error:      Red     (#ef4444)   - Critical

Background: #02040a (near-black, blue tint)
Surface:    #0a0f1e (elevated dark)
```

**2026 Trends:**
- **Mesh gradients** - Multi-color with soft-glow effects
- **Blue-greens dominant** - The color trend of 2026
- **Dark mode as default** - Expected, not optional
- **Adaptive systems** - Palettes that shift by context

### Modern Effects

**Glassmorphism (evolved):**
```css
backdrop-blur-sm bg-white/5 border border-white/10
```

**Gradient text:**
```css
bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400
```

**Glow borders:**
```css
border border-cyan-500/30 bg-cyan-500/5
```

**Radial vignette:**
```css
bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]
```

### Typography (2026)

- **Variable fonts** - Multiple weights in single file, responsive scaling
- **Expressive & playful** - Bold, rounded, moving away from sterile minimalism
- **Hierarchy via tracking** - Uppercase titles with `tracking-[0.08em]`
- **Mono for technical** - `font-mono` for code, stats, data
- **Size scale** - 5xl titles → lg subtitles → sm/base body

### Layout Trends

**Bento Grids (dominant pattern):**
- 67% of top SaaS products now use bento layouts
- Asymmetric, card-based with varying spans
- Exaggerated corner rounding (`rounded-xl`, `rounded-2xl`)
- Animated grids that reorganize on scroll

**Content-First (Apple's Liquid Glass):**
- UI serves content, not vice versa
- Three principles: hierarchy, harmony, consistency
- Floating controls, dynamic interfaces that morph contextually

---

## 2026 React/TypeScript Patterns

### Component Architecture
```tsx
// Compound components with hooks + Context (2026 standard)
interface Props {
  active: boolean
}

export function MySlide({ active }: Props) {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0">...</div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-16">
        ...
      </div>
    </div>
  )
}
```

### TypeScript Standards
- **Strict mode always** - `"strict": true` from project start
- **No `any`** - Defeats TypeScript benefits entirely
- **Explicit null handling** - `strictNullChecks` enabled
- **Interface over type** - For object shapes (extendable)

### State Management (2026)
| Use Case | Solution |
|----------|----------|
| Server data | React Query / TanStack Query |
| Component state | useState / useReducer |
| Shared client state | Zustand (simple) or Jotai (atomic) |
| Enterprise scale | Redux Toolkit |

### Path Aliases
```tsx
import { Template } from '@catalog/templates'
import { Runtime } from '@shared/runtime'
```

---

## What's Outdated (Avoid)

### Code Patterns
- ❌ Class components
- ❌ Render props (use hooks instead)
- ❌ Redux without Toolkit
- ❌ Context for complex state (use Zustand/Jotai)
- ❌ `any` types
- ❌ Prop drilling without memoization

### Animation Anti-Patterns
- ❌ Animating layout properties (width, height, margin)
- ❌ Re-animating every render (use `hasAnimated` guard)
- ❌ Heavy shadows on animated elements
- ❌ Ignoring `prefers-reduced-motion`
- ❌ Scroll listeners without throttling (use IntersectionObserver)

### Design Anti-Patterns
- ❌ Flat, sterile minimalism (feels dated)
- ❌ Light mode only (dark mode expected)
- ❌ Static layouts without micro-interactions
- ❌ Generic stock photography (authenticity valued)
- ❌ Over-polished AI aesthetic (human touch preferred)

---

## Quick Reference

### Slide Structure
```tsx
<div className="relative w-full h-screen bg-black overflow-hidden">
  <Background variant="nebula" />
  <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center h-full px-16">
    {/* Content */}
  </div>
</div>
```

### Icon Usage
```tsx
import { Icon } from '@catalog/primitives'
<Icon name="Zap" size={20} className="text-cyan-400" />
```

### Animation Timing
```tsx
gsap.fromTo(el,
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
)
```

---

## Sources

- Envato: 2026 Motion Design Trends
- LogRocket: React Animation Libraries Comparison
- Vercel: React Best Practices
- Apple WWDC25: Liquid Glass Design System
- Stripe: Accessible Color Systems
- SaaSFrame: Bento Grid Practical Guide
- NN Group: Neubrutalism Best Practices
