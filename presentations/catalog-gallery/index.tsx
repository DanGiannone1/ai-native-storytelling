import { DeckPlayer } from '@shared/runtime/DeckPlayer'
import { CatalogGallerySlide } from './slides'

export const metadata = {
  title: 'Catalog Gallery',
  description: 'Visual index of catalog slides',
}

export default function CatalogGalleryDeck() {
  return (
    <DeckPlayer title={metadata.title} transition="fade">
      <CatalogGallerySlide active={false} />
    </DeckPlayer>
  )
}
