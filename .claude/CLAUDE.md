# AI Native Storytelling - Project Conventions

## Overview
React-based presentation framework for creating animated visual presentations.

## Project Structure
```
presentations/          # Individual presentations
  {name}/
    index.tsx           # Main entry, exports metadata + default component
    slides/
      index.ts          # Re-exports all slides
      01-TitleSlide.tsx # Numbered slide files
      02-*.tsx
catalog/                # Reusable components
  templates/            # Slide templates (CircularHub, Convergence, etc.)
  visuals/              # Backgrounds, effects
  motion/               # Animation utilities
  primitives/           # Icons, tokens
shared/runtime/         # DeckPlayer, SlideWrapper
```

## Creating Presentations

### New Presentation Checklist
1. Create folder: `presentations/{kebab-case-name}/`
2. Create `index.tsx` with metadata export and default component
3. Create `slides/index.ts` to export all slides
4. Create numbered slide files: `01-TitleSlide.tsx`, `02-ContentSlide.tsx`, etc.

### Slide Component Pattern
```tsx
import { SomeTemplate } from '@catalog/templates'

interface SlideProps {
  active: boolean  // Required - triggers animations
}

export function MySlide({ active }: SlideProps) {
  return <SomeTemplate active={active} /* props */ />
}
```

### Available Templates
- **TitleSlide** - Simple centered title (basic)
- **Convergence** - Animated particles converging, badges, hero title (impactful openers)
- **CircularHub** - Orbital diagram with central hub and nodes
- **TimelineRiver** - Horizontal timeline with milestones
- **AgentLoop** - Infinity loop with stations
- **Barrier** - Side-by-side comparison
- **RadialTools** - Radial arrangement of items
- **TaskCards** - Grid of cards
- **FlowLanes** - Multi-lane flow diagrams

### Background Variants
Use `<Background variant="..." />`:
- `default` - Dark with noise
- `grid` - Grid overlay
- `glow` - Pulsing cyan/violet glow
- `particles` - Floating particle field
- `nebula` - Atmospheric nebula effect
- `horizon` - Horizon line effect

## Code Style
- Use `@catalog/` and `@shared/` path aliases
- Number slide files for ordering: `01-`, `02-`, etc.
- Export slide components with `{ active: boolean }` prop
- Keep slide components focused - use templates for layout

## Running
```bash
npm run dev          # Start dev server on port 3500
npm run build        # Production build
```

## URLs
- Picker: http://localhost:3500/
- Direct: http://localhost:3500/?deck={presentation-name}
