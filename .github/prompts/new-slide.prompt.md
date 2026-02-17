---
name: new-slide
description: Generate a new slide component for a presentation
agent: agent
argument-hint: "Slide name and content description"
tools: ["search", "edit"]
---

# New Slide Generator

Create a new slide component for this presentation framework.

## Input Required
- Presentation name: ${input:presentation:Which presentation?}
- Slide title: ${input:title:Slide title}
- Content type: ${input:type:Content type (timeline, comparison, features, process, team, custom)}

## Requirements

1. Check existing slides in `presentations/${input:presentation}/slides/` for numbering
2. Select appropriate template based on content type:
   - timeline → TimelineRiver
   - comparison → Barrier
   - features → RadialTools or TaskCards
   - process → AgentLoop or FlowLanes
   - team → TeamRoster
   - custom → SlideWrapper with custom layout

3. Create slide file with correct naming: `{NN}-{PascalCaseTitle}.tsx`

4. Include `active: boolean` prop

5. Export from `slides/index.ts`

6. Add to DeckPlayer in presentation `index.tsx`

## Template

```tsx
import { TemplateName } from '@catalog/templates'

interface SlideProps {
  active: boolean
}

export function ${input:title}({ active }: SlideProps) {
  return (
    <TemplateName
      active={active}
      title="${input:title}"
      // Add template-specific props
    />
  )
}
```
