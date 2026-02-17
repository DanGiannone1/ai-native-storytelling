---
name: new-presentation
description: Create a new presentation with standard folder structure, index file, and a title slide using the Convergence template
argument-hint: "Presentation title (e.g., 'AI Strategy Overview')"
user-invokable: true
disable-model-invocation: false
---

# Skill: Create New Presentation

Create a new presentation with the standard folder structure and a title slide.

## Steps

1. **Generate folder name** from title (kebab-case, lowercase)

2. **Create folder structure:**
   ```
   presentations/{name}/
     index.tsx
     slides/
       index.ts
       01-TitleSlide.tsx
   ```

3. **Create index.tsx:**
   ```tsx
   import { DeckPlayer } from '@shared/runtime/DeckPlayer'
   import { TitleSlide } from './slides'

   export const metadata = {
     title: '{Title}',
     description: '{Brief description}',
   }

   export default function {PascalName}Presentation() {
     return (
       <DeckPlayer title={metadata.title} transition="fade">
         <TitleSlide active={false} />
       </DeckPlayer>
     )
   }
   ```

4. **Create title slide** using `Convergence` template for visual impact:
   ```tsx
   import { Convergence, Badge } from '@catalog/templates'

   const badges: Badge[] = [
     // 2-4 badges highlighting key themes
   ]

   interface TitleSlideProps {
     active: boolean
   }

   export function TitleSlide({ active }: TitleSlideProps) {
     return (
       <Convergence
         title="{MainWord}"
         tagline="{Rest of title}"
         centerIcon="{RelevantIcon}"
         badges={badges}
         active={active}
       />
     )
   }
   ```

5. **Create slides/index.ts:**
   ```tsx
   export { TitleSlide } from './01-TitleSlide'
   ```

6. **Confirm** the presentation is accessible at `http://localhost:3500/?deck={name}`
