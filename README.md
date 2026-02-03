# AI Native Storytelling

A React-based presentation framework for creating stunning, animated visual presentations.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Navigate to `http://localhost:5173` to see the presentation picker.

## Creating a Presentation

1. Create a new folder under `presentations/`:

```
presentations/
└── my-presentation/
    ├── index.tsx
    └── slides/
        ├── 01-TitleSlide.tsx
        ├── 02-ContentSlide.tsx
        └── index.ts
```

2. Create your main presentation file (`index.tsx`):

```tsx
import { DeckPlayer } from '@shared/runtime/DeckPlayer'
import { TitleSlide, ContentSlide } from './slides'

export const metadata = {
  title: 'My Presentation',
  description: 'A brief description',
}

export default function MyPresentation() {
  return (
    <DeckPlayer title={metadata.title} transition="fade">
      <TitleSlide active={false} />
      <ContentSlide active={false} />
    </DeckPlayer>
  )
}
```

3. Export your slides from `slides/index.ts`:

```tsx
export { TitleSlide } from './01-TitleSlide'
export { ContentSlide } from './02-ContentSlide'
```

## Available Components

### Templates (`@catalog/templates`)

- **TitleSlide** - Cover/intro slides with centered title
- **TimelineRiver** - Horizontal timeline with milestones
- **CircularHub** - Central hub with radiating connections
- **Barrier** - Side-by-side comparison layout
- **RadialTools** - Radial arrangement of items
- **TaskCards** - Grid of task/feature cards
- **TeamRoster** - Team member showcase
- **FlowLanes** - Multi-lane flow diagrams
- **AgentLoop** - Cyclical process visualization
- **CircularClock** - Time-based activity display

### Visuals (`@catalog/visuals`)

- **Background** - Animated backgrounds (particles, grid, gradient)

### Primitives (`@catalog/primitives`)

- **Icon** - Lucide icon wrapper with consistent styling

### Motion (`@catalog/motion`)

- **SlideContent** - Animated content wrapper
- **itemVariants** - Framer Motion variants for staggered animations

## Keyboard Navigation

- **Arrow Right / Space / Click** - Next slide
- **Arrow Left** - Previous slide
- **Home** - First slide
- **End** - Last slide
- **Escape** - Exit to presentation picker

## Project Structure

```
├── catalog/           # Reusable components
│   ├── primitives/    # Base UI elements
│   ├── visuals/       # Backgrounds, effects
│   ├── motion/        # Animation utilities
│   ├── templates/     # Slide templates
│   ├── diagrams/      # Complex visualizations
│   └── slides/        # Pre-built slide examples
├── presentations/     # Your presentations
├── shared/            # Runtime & utilities
└── src/               # App entry point
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- GSAP
- Three.js / React Three Fiber

## License

MIT
