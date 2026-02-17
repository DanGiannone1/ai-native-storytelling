---
name: list-templates
description: Show all available slide templates with their use cases, key props, background variants, and UI components
argument-hint: ""
user-invokable: true
disable-model-invocation: false
---

# Skill: List Available Templates

Show all available slide templates with their use cases and key props.

## Output

### Title & Branding
- **TitleSlide** - Simple centered title
  - Props: `title`, `subtitle?`
- **Convergence** - Animated particle convergence with badges
  - Props: `title`, `tagline?`, `centerIcon`, `badges?: Badge[]`, `active`

### Diagrams & Layouts
- **CircularHub** - Orbital diagram with center hub
  - Props: `title`, `centerTitle`, `centerIcon?`, `nodes: HubNode[]`, `connections?: HubConnection[]`
- **TimelineRiver** - Horizontal timeline
  - Props: `title`, `milestones: Milestone[]`
- **AgentLoop** - Infinity loop process
  - Props: `title`, `stations: LoopStation[]`, `equation?: EquationPart[]`, `active`
- **FlowLanes** - Multi-lane flow diagram
  - Props: `title`, `agents: FlowAgent[]`

### Content & Comparison
- **Barrier** - Side-by-side comparison
  - Props: `title`, `leftTitle`, `rightTitle`, `left: BarrierItem[]`, `right: BarrierItem[]`
- **RadialTools** - Radial item arrangement
  - Props: `title`, `items: RadialItem[]`
- **TaskCards** - Grid of cards
  - Props: `title`, `cards: TaskCard[]`
- **TeamRoster** - Team member display
  - Props: `title`, `members: TeamMember[]`

### Time-based
- **CircularClock** - Clock-based activity display
  - Props: `title`, `activities: ClockActivity[]`

### Bento & Modular
- **BentoGrid** - Apple-style modular tile layout
  - Props: `title`, `subtitle?`, `tiles: BentoTile[]`, `active`
  - Tile spans: `normal`, `wide`, `tall`, `large`

### Backgrounds
Available via `<Background variant="..." />`:
- `default`, `grid`, `glow`, `particles`, `nebula`, `horizon`

Available via `<Background3D variant="..." />` (Three.js):
- `orbs` - Floating 3D orbs with glow
- `glass` - Translucent glass panels
- `particles` - 3D particle field
- `stars` - Star field with central orb

### Liquid Glass UI
- **LiquidGlass** - Glassmorphism container
  - Props: `variant`, `color`, `blur`, `glow`, `hover`
- **GlassButton** - Translucent button
- **GlassBadge** - Glassmorphism badge

### Non-Linear Navigation
DeckPlayer supports section-based navigation:
```tsx
<DeckPlayer
  sections={[
    { title: 'Intro', startIndex: 0 },
    { title: 'Core', startIndex: 3 },
    { title: 'Conclusion', startIndex: 8 },
  ]}
>
```
Press **G** to open slide navigator overlay.
