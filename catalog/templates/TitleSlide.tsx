import { SlideWrapper } from '@shared/runtime'

interface TitleSlideProps {
  title: string
  subtitle?: string
  className?: string
}

/**
 * Cover/intro slide template with centered title and optional subtitle.
 */
export function TitleSlide({ title, subtitle, className = '' }: TitleSlideProps) {
  return (
    <SlideWrapper className={className}>
      <div className="flex flex-col items-center justify-center h-full px-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.15em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase drop-shadow-lg text-center">
          {title}
        </h1>

        {subtitle && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <p className="text-cyan-100/70 tracking-wide text-sm md:text-base font-light uppercase text-center max-w-2xl">
              {subtitle}
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>
        )}
      </div>
    </SlideWrapper>
  )
}
