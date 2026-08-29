import ExperienceRowList from './ExperienceRowList'
import TestimonialCarousel from './TestimonialCarousel'

const TESTIMONIALS = [
  {
    quote:
      'Dewansh approaches systemic complexities with a rare blend of research precision and absolute execution speed.',
    attribution: 'Design Director',
    role: 'Goldenflitch',
  },
  {
    quote:
      'His M.Des UX background was instantly apparent in how he managed our design system components.',
    attribution: 'Lead Engineer',
    role: 'Product Team',
  },
] as const

// ── Section ───────────────────────────────────────────────────────────────────

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full scroll-mt-28 px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section header — full width */}
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-3 w-3 flex-shrink-0 rounded-sm bg-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Experience
            </span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 lg:text-4xl">
            Where I&apos;ve delivered product value.
          </h2>
        </div>

        {/* Two-column body — list + testimonial aligned */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ExperienceRowList />
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <TestimonialCarousel items={[...TESTIMONIALS]} />
          </aside>
        </div>

        <div className="mt-14 flex justify-center">
          <div className="relative inline-block">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-full border-2 border-black bg-blue-600"
            />
            <a
              href="/resume.pdf"
              download
              className="relative z-10 block cursor-pointer select-none rounded-full border-2 border-black bg-white px-8 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-transform hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[6px] active:translate-y-[6px]"
            >
              Download Full Resume PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
