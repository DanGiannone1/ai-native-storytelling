# Skill: Add Slide to Presentation

Add a new slide to an existing presentation.

## Usage
```
/add-slide {presentation-name} {slide-title}
```

## Steps

1. **Determine slide number** by checking existing slides in `presentations/{name}/slides/`

2. **Choose appropriate template** based on content type:
   - Timeline/history → `TimelineRiver`
   - Central concept with related items → `CircularHub`
   - Process/workflow → `AgentLoop` or `FlowLanes`
   - Comparison → `Barrier`
   - Features/capabilities → `RadialTools` or `TaskCards`
   - Team/people → `TeamRoster`
   - Simple content → Use `SlideWrapper` with custom layout

3. **Create slide file** at `presentations/{name}/slides/{NN}-{SlideTitle}.tsx`:
   ```tsx
   import { TemplateName } from '@catalog/templates'

   interface SlideProps {
     active: boolean
   }

   export function SlideTitle({ active }: SlideProps) {
     return (
       <TemplateName
         active={active}
         // template-specific props
       />
     )
   }
   ```

4. **Export from slides/index.ts:**
   ```tsx
   export { SlideTitle } from './{NN}-{SlideTitle}'
   ```

5. **Add to presentation index.tsx** in the DeckPlayer children

## Template Quick Reference

| Content Type | Template | Key Props |
|-------------|----------|-----------|
| Timeline | `TimelineRiver` | `milestones: Milestone[]` |
| Hub diagram | `CircularHub` | `nodes: HubNode[]`, `centerTitle` |
| Process loop | `AgentLoop` | `stations: LoopStation[]` |
| Comparison | `Barrier` | `left: BarrierItem[]`, `right: BarrierItem[]` |
| Features | `RadialTools` | `items: RadialItem[]` |
| Cards | `TaskCards` | `cards: TaskCard[]` |
