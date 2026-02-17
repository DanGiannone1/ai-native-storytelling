---
name: animate-element
description: Add GSAP animation to a slide element with proper guards and cleanup
agent: agent
argument-hint: "Element and animation description"
---

# GSAP Animation Generator

Add proper GSAP animation to a slide element following project patterns.

## Input
- Target element: ${input:element:CSS selector or ref name}
- Animation: ${input:animation:Describe the animation (e.g., "fade in from bottom")}

## Animation Template

```tsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface SlideProps {
  active: boolean
}

export function AnimatedSlide({ active }: SlideProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  // Run animation when slide becomes active
  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const el = containerRef.current.querySelector('${input:element}')
    if (!el) return

    gsap.fromTo(el,
      { /* from state */ },
      {
        /* to state */
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2
      }
    )
  }, [active])

  // Reset animation flag when deactivated
  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current.querySelectorAll('*'))
      }
    }
  }, [])

  return (
    <div ref={containerRef}>
      {/* Content */}
    </div>
  )
}
```

## Common Animations

**Fade in from bottom:**
```tsx
{ opacity: 0, y: 30 }
{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
```

**Scale in:**
```tsx
{ opacity: 0, scale: 0.8 }
{ opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }
```

**Stagger children:**
```tsx
gsap.fromTo(
  containerRef.current.querySelectorAll('.item'),
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
)
```

## Rules
- Only animate: `transform`, `opacity`, `filter`, `clip-path`
- Always use `hasAnimated` guard
- Clean up with `gsap.killTweensOf` on unmount
- Use `power2.out` for entrances, `back.out(1.4)` for playful pops
