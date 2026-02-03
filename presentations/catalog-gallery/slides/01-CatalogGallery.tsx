import { CatalogGalleryGrid } from '@catalog/gallery'

interface CatalogGallerySlideProps {
  active: boolean
}

export const CatalogGallerySlide = ({ active }: CatalogGallerySlideProps) => {
  return <CatalogGalleryGrid active={active} />
}
