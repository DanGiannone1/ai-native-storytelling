import { useState, useEffect } from 'react'

// Dynamic presentation loader
// In dev, this discovers and loads presentations
// Presentations register themselves via the presentations registry

interface PresentationModule {
  default: React.ComponentType
  metadata?: {
    title: string
    description?: string
  }
}

// Dynamically import all presentation index files
const presentationModules = import.meta.glob<PresentationModule>(
  '../presentations/*/index.tsx',
  { eager: true }
)

interface Presentation {
  id: string
  title: string
  Component: React.ComponentType
}

function getPresentations(): Presentation[] {
  const presentations: Presentation[] = []

  for (const [path, module] of Object.entries(presentationModules)) {
    // Extract presentation ID from path: ../presentations/ai-native-business/index.tsx -> ai-native-business
    const match = path.match(/\.\.\/presentations\/([^/]+)\/index\.tsx$/)
    if (match && module.default) {
      presentations.push({
        id: match[1],
        title: module.metadata?.title || match[1].replace(/-/g, ' '),
        Component: module.default
      })
    }
  }

  return presentations
}

export function DeckLoader() {
  const [presentations] = useState(getPresentations)
  const [activePresentationId, setActivePresentationId] = useState<string | null>(null)

  // Check URL for presentation ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const deckId = params.get('deck')
    if (deckId && presentations.find(p => p.id === deckId)) {
      setActivePresentationId(deckId)
    }
  }, [presentations])

  // If a presentation is active, render it fullscreen
  const activePresentation = presentations.find(p => p.id === activePresentationId)
  if (activePresentation) {
    const { Component } = activePresentation
    return <Component />
  }

  // Otherwise, show the presentation picker
  return (
    <div className="min-h-screen bg-deck-bg text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-wide mb-2">Presentations</h1>
        <p className="text-slate-400 mb-8">Select a presentation to view</p>

        {presentations.length === 0 ? (
          <div className="text-slate-500 border border-slate-800 rounded-lg p-8 text-center">
            <p>No presentations found.</p>
            <p className="text-sm mt-2">Create a presentation in <code className="bg-slate-800 px-2 py-1 rounded">presentations/[name]/index.tsx</code></p>
          </div>
        ) : (
          <div className="grid gap-4">
            {presentations.map(presentation => (
              <button
                key={presentation.id}
                onClick={() => {
                  window.history.pushState({}, '', `?deck=${presentation.id}`)
                  setActivePresentationId(presentation.id)
                }}
                className="text-left p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
              >
                <h2 className="text-xl font-semibold capitalize group-hover:text-cyan-400 transition-colors">
                  {presentation.title}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  presentations/{presentation.id}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
