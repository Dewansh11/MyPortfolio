import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'

export interface Testimonial {
  quote: string
  attribution: string
  role?: string
}

interface TestimonialCarouselProps {
  items: Testimonial[]
}

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 24 : -24,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -24 : 24,
  }),
}

function NavArrow({
  direction,
  onClick,
  label,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        className={direction === 'prev' ? 'rotate-180' : ''}
      >
        <path
          d="M3 7h8M7 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const total = items.length

  const goTo = useCallback(
    (index: number, slideDirection: number) => {
      if (total === 0) return
      setDirection(slideDirection)
      setActiveIndex((index + total) % total)
    },
    [total],
  )

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1, -1)
  }, [activeIndex, goTo])

  const goNext = useCallback(() => {
    goTo(activeIndex + 1, 1)
  }, [activeIndex, goTo])

  if (total === 0) return null

  const active = items[activeIndex]
  const indexLabel = String(activeIndex + 1).padStart(2, '0')
  const totalLabel = String(total).padStart(2, '0')

  return (
    <div
      className="flex h-full flex-col rounded-2xl border-2 border-black bg-[#fcfbfa] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft') goPrev()
        if (event.key === 'ArrowRight') goNext()
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b-2 border-black px-5 py-4 md:px-6">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-blue-600">
          Testimonials
        </span>
        <span className="font-mono text-[10px] font-semibold tabular-nums tracking-widest text-zinc-400">
          {indexLabel} / {totalLabel}
        </span>
      </div>

      {/* Quote body */}
      <div className="relative flex flex-1 flex-col px-5 py-6 md:px-6 md:py-7">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-4 font-serif text-5xl leading-none text-blue-600/15 md:left-6"
        >
          &ldquo;
        </span>

        <div className="relative min-h-[148px] flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={activeIndex}
              custom={direction}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0"
              aria-live="polite"
            >
              <p className="relative z-10 text-base leading-relaxed text-zinc-700 md:text-[17px] md:leading-relaxed">
                {active.quote}
              </p>
              <footer className="relative z-10 mt-6 border-t border-black/10 pt-4">
                <cite className="not-italic">
                  <span className="block font-mono text-xs font-semibold uppercase tracking-wide text-zinc-900">
                    {active.attribution}
                  </span>
                  {active.role && (
                    <span className="mt-1 block font-mono text-[10px] font-medium uppercase tracking-widest text-zinc-400">
                      {active.role}
                    </span>
                  )}
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 border-t-2 border-black px-5 py-4 md:px-6">
        <NavArrow direction="prev" onClick={goPrev} label="Previous testimonial" />

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={activeIndex === i ? 'true' : undefined}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              className={`h-2 w-2 rounded-full border border-black transition-colors duration-200 ${
                activeIndex === i ? 'bg-blue-600' : 'bg-white hover:bg-blue-100'
              }`}
            />
          ))}
        </div>

        <NavArrow direction="next" onClick={goNext} label="Next testimonial" />
      </div>
    </div>
  )
}
