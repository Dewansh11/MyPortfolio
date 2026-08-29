import { type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BrutalistButton from '../components/BrutalistButton'
import CaseStudySectionLabel from '../components/case-study/CaseStudySectionLabel'
import ImagePlaceholder from '../components/case-study/ImagePlaceholder'

// ── Shared layout tokens (match site: px-6 py-24, max-w-6xl) ────────────────

const CONTENT = 'mx-auto w-full max-w-6xl px-6'
const SECTION = 'py-24'
const CARD =
  'border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
const CHIP =
  'inline-flex items-center rounded-lg border-[3px] border-black bg-zinc-100 px-3 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'

// ── Placeholder copy — replace before publishing ──────────────────────────────

const STUDIES = {
  porvenix: {
    projectTitle: 'Porvenix',
    heroMeta: 'Product Designer · Solo Project · Web · 2025–2026',
    heroSrc: '/porvenix-mockup.png',
    prevSlug: 'mobile-banking',
    prevName: 'Mobile Banking App',
    nextSlug: 'onboarding-flow',
    nextName: 'Onboarding Flow Redesign',
  },
  'onboarding-flow': {
    projectTitle: 'Onboarding Flow Redesign',
    heroMeta: 'Product Designer · B2B SaaS · Web · 2024',
    heroSrc: '/porvenix-mockup.png',
    prevSlug: 'porvenix',
    prevName: 'Porvenix',
    nextSlug: 'fintech-design-system',
    nextName: 'Fintech Design System',
  },
  'fintech-design-system': {
    projectTitle: 'Fintech Design System',
    heroMeta: 'Systems Designer · Multi-team · Web · 2024',
    heroSrc: '/porvenix-mockup.png',
    prevSlug: 'onboarding-flow',
    prevName: 'Onboarding Flow Redesign',
    nextSlug: 'mobile-banking',
    nextName: 'Mobile Banking App',
  },
  'mobile-banking': {
    projectTitle: 'Mobile Banking App',
    heroMeta: 'Product Designer · Consumer FinTech · Mobile · 2023',
    heroSrc: '/porvenix-mockup.png',
    prevSlug: 'fintech-design-system',
    prevName: 'Fintech Design System',
    nextSlug: 'porvenix',
    nextName: 'Porvenix',
  },
} as const

type StudySlug = keyof typeof STUDIES

const PLACEHOLDER = {
  hook: 'One sentence that frames the problem and why it mattered.',
  problemBody:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  pullQuote: 'KEY INSIGHT OR RESEARCH FINDING GOES HERE.',
  solutionIntro: "Here's what we shipped and why each screen decision matters.",
  outcomeStat: '00% IMPROVEMENT IN [METRIC]',
  outcomeBody:
    'Short explanation of what this metric means and why it matters to the business.',
  reflection:
    'If I had more time / data / access, I would have done X differently because Y. This is what I learned from the constraint.',
} as const

const CONTEXT_DASHBOARD = {
  role: 'Product Designer',
  timeline: '2025–2026 · 12 weeks',
  tools: ['Figma', 'FigJam', 'Cursor', 'Claude'],
} as const

const ROLE_ITEMS = [
  'Owned interaction design end-to-end',
  'Co-facilitated 2 user research sessions',
  'Collaborated with 1 PM, 3 engineers',
  'Documented handoff specs for engineering',
] as const

const CONSTRAINT_ITEMS = [
  '3-week delivery timeline',
  'No dedicated researcher on team',
  'Android-only for initial release',
  'Legacy backend limited API changes',
] as const

const RESEARCH_INSIGHTS = [
  'Drop-off clustered at steps three and five',
  'Dual CTAs created decision paralysis',
  'Verification before value killed first-action completion',
  'Custom modals reduced trust vs native patterns',
] as const

const RESEARCH_CHIPS = [
  '12 interviews',
  'Drop-off map',
  'Task analysis',
  'Usability sessions',
  'Mental models',
] as const

const IA_STEPS = [
  {
    number: '01',
    label: 'Discover',
    choice: 'Collapsed a seven-step onboarding flow into three progressive screens.',
    why: 'User interviews showed drop-off clustered at steps three and five. Progressive disclosure kept core tasks intact while removing redundant confirmation screens.',
  },
  {
    number: '02',
    label: 'Decide',
    choice: 'Defaulted to a single primary action per screen instead of dual CTAs.',
    why: 'Usability sessions revealed decision paralysis when two equally weighted buttons appeared above the fold. One action reduced time-on-task in prototype testing.',
  },
  {
    number: '03',
    label: 'Act',
    choice: 'Moved account verification to after first value moment.',
    why: 'Analytics showed users abandoned before experiencing core product value. Deferring verification increased completion of the first meaningful action.',
  },
] as const

const WIREFRAME_SLOTS = [
  {
    label: 'Low-fi — Onboarding skeleton',
    note: 'Layout configuration for the three-step progressive flow.',
  },
  {
    label: 'Low-fi — Feed IA',
    note: 'Card grid vs list density tests before visual styling.',
  },
  {
    label: 'Low-fi — Checkout / empty state',
    note: 'Primary-action placement and empty-state hierarchy.',
  },
] as const

const SYSTEM_CORE = [
  {
    step: '01',
    title: 'Auto-Layout',
    body: 'Frames, gaps, and constraints locked so market cards and nav tiers scale without breaking density.',
  },
  {
    step: '02',
    title: 'Tokens',
    body: 'Color, type, and spacing tokens as the single source of truth before any high-fidelity paint.',
  },
  {
    step: '03',
    title: 'Components',
    body: 'Reusable card types, chips, and keycap buttons — the system that made the live UI possible.',
  },
] as const

const STATS = [
  { value: '00%', label: 'Metric One' },
  { value: '00 WKS', label: 'Metric Two' },
  { value: '00 → 00', label: 'Metric Three' },
] as const

const SCREENS = [
  { layout: 'full' as const, label: 'Screen — Onboarding' },
  { layout: 'half' as const, label: 'Screen — Checkout' },
  { layout: 'half' as const, label: 'Screen — Empty State' },
  { layout: 'full' as const, label: 'Screen — Dashboard' },
  { layout: 'half' as const, label: 'Screen — Settings' },
  { layout: 'half' as const, label: 'Screen — Profile' },
] as const

// ── Hero (visual opener — not numbered) ─────────────────────────────────────

function HeroMockup({
  title,
  meta,
  heroSrc,
}: {
  title: string
  meta: string
  heroSrc: string
}) {
  return (
    <header className="w-full border-b-[3px] border-black bg-[#fcfbfa]">
      <div className={`${CONTENT} pb-12 pt-10 md:pb-16 md:pt-14`}>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-zinc-900 lg:text-5xl">
          {title}
        </h1>
        <p className="mt-5 font-mono text-xs font-bold uppercase tracking-widest text-zinc-500">
          {meta}
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <img src={heroSrc} alt={`${title} product mockup`} className="block h-auto w-full" />
        </div>
      </div>
    </header>
  )
}

// ── 01 Context Dashboard ────────────────────────────────────────────────────

function ContextDashboard() {
  return (
    <section className={SECTION} aria-labelledby="context-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="01" title="Context Dashboard" />
        <p id="context-heading" className="sr-only">
          Role, timeline, and tools
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <article className={`${CARD} bg-zinc-100 p-8`}>
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
              Role
            </p>
            <p className="mb-6 font-mono text-lg font-extrabold uppercase text-black">
              {CONTEXT_DASHBOARD.role}
            </p>
            <ul className="space-y-3">
              {ROLE_ITEMS.map(item => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
                  <span className="mt-0.5 shrink-0 font-mono text-sm font-extrabold text-blue-600">
                    ■
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${CARD} p-8`}>
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
              Timeline
            </p>
            <p className="mb-6 font-mono text-lg font-extrabold uppercase text-black">
              {CONTEXT_DASHBOARD.timeline}
            </p>
            <ul className="space-y-3">
              {CONSTRAINT_ITEMS.map(item => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
                  <span className="mt-0.5 shrink-0 font-mono text-sm font-extrabold text-orange-500">
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${CARD} bg-amber-400 p-8`}>
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-black">
              Tools Used
            </p>
            <div className="flex flex-wrap gap-2">
              {CONTEXT_DASHBOARD.tools.map(tool => (
                <span key={tool} className={CHIP}>
                  {tool}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

// ── 02 Problem Space ────────────────────────────────────────────────────────

function ProblemSpaceSection() {
  return (
    <section className={`${SECTION} bg-white`} aria-labelledby="problem-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="02" title="The Problem Space" />

        <p className="mb-12 max-w-4xl text-2xl font-semibold leading-snug tracking-tight text-black lg:text-3xl">
          {PLACEHOLDER.hook}
        </p>

        <div className="grid grid-cols-1 items-start gap-12 overflow-visible lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-base leading-relaxed text-zinc-500">{PLACEHOLDER.problemBody}</p>
            <p className="mt-4 text-base leading-relaxed text-zinc-500">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>

          <aside className="overflow-visible lg:col-span-5">
            <blockquote
              className={`${CARD} bg-blue-600 p-8`}
              style={{ transform: 'rotate(-1deg)' }}
            >
              <p className="font-mono text-sm font-extrabold uppercase leading-relaxed tracking-wide text-white">
                {PLACEHOLDER.pullQuote}
              </p>
            </blockquote>
          </aside>
        </div>
      </div>
    </section>
  )
}

// ── 03 UX Research Intelligence ─────────────────────────────────────────────

function ResearchSection() {
  return (
    <section className={SECTION} aria-labelledby="research-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="03" title="UX Research Intelligence" />
        <p id="research-heading" className="sr-only">
          Research insights and takeaways
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {RESEARCH_CHIPS.map(chip => (
            <span key={chip} className={`${CHIP} -rotate-1 bg-amber-400`}>
              {chip}
            </span>
          ))}
        </div>

        <div className={`${CARD} overflow-hidden bg-zinc-100`}>
          <ul className="divide-y-[3px] divide-black">
            {RESEARCH_INSIGHTS.map((insight, index) => (
              <li key={insight} className="flex items-start gap-4 px-6 py-5 md:px-8">
                <span className="font-mono text-sm font-extrabold text-blue-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-base font-semibold leading-relaxed text-black">{insight}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ── 04 Experience Mapping & IA ──────────────────────────────────────────────

function ExperienceMappingSection() {
  return (
    <section className={`${SECTION} bg-white`} aria-labelledby="ia-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="04" title="Experience Mapping & IA" />
        <p id="ia-heading" className="sr-only">
          User journey and information architecture
        </p>

        <div className="flex flex-col gap-8">
          {IA_STEPS.map(step => (
            <article key={step.number} className={`relative overflow-hidden ${CARD}`}>
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-blue-600" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-6 p-8 pl-10 md:grid-cols-12">
                <div className="md:col-span-2">
                  <p className="font-mono text-5xl font-extrabold leading-none text-blue-600">
                    {step.number}
                  </p>
                  <p className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
                    {step.label}
                  </p>
                </div>
                <div className="space-y-4 md:col-span-10">
                  <p className="text-base font-semibold leading-relaxed text-black">{step.choice}</p>
                  <p className="text-base leading-relaxed text-zinc-500">{step.why}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 05 UI Concepts & Layout Structure ───────────────────────────────────────

function UiConceptsSection() {
  return (
    <section className={SECTION} aria-labelledby="concepts-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="05" title="UI Concepts & Layout Structure" />
        <p id="concepts-heading" className="sr-only">
          Wireframes and layout configuration
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {WIREFRAME_SLOTS.map(slot => (
            <figure key={slot.label}>
              <ImagePlaceholder
                label={slot.label}
                ariaLabel={slot.label}
                className="h-[200px] w-full bg-zinc-100"
              />
              <figcaption className="mt-3 font-mono text-xs font-bold uppercase tracking-widest text-zinc-500">
                {slot.note}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 06 UI Design System Core ────────────────────────────────────────────────

function DesignSystemSection() {
  return (
    <section className={`${SECTION} bg-white`} aria-labelledby="system-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="06" title="UI Design System Core" />
        <p id="system-heading" className="sr-only">
          Auto-layout, tokens, and components
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {SYSTEM_CORE.map(item => (
            <article key={item.step} className={`${CARD} bg-zinc-100 p-8`}>
              <p className="mb-3 font-mono text-xs font-extrabold uppercase tracking-widest text-blue-600">
                Step {item.step}
              </p>
              <h3 className="mb-4 text-xl font-semibold tracking-tight text-black">{item.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 07 High-Fidelity Solutions ──────────────────────────────────────────────

function HighFidelitySection() {
  let halfBuffer: (typeof SCREENS)[number][] = []
  const rows: ReactNode[] = []

  const flushHalfRow = () => {
    if (halfBuffer.length === 0) return
    rows.push(
      <div key={`half-${rows.length}`} className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {halfBuffer.map(screen => (
          <ScreenSlot key={screen.label} label={screen.label} />
        ))}
        {halfBuffer.length === 1 && <div className="hidden md:block" aria-hidden="true" />}
      </div>,
    )
    halfBuffer = []
  }

  SCREENS.forEach(screen => {
    if (screen.layout === 'full') {
      flushHalfRow()
      rows.push(<ScreenSlot key={screen.label} label={screen.label} fullWidth />)
    } else {
      halfBuffer.push(screen)
      if (halfBuffer.length === 2) flushHalfRow()
    }
  })
  flushHalfRow()

  return (
    <section className={`${SECTION} py-32`} aria-labelledby="hifi-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="07" title="High-Fidelity Solutions" />
        <p className="mb-12 max-w-3xl text-base leading-relaxed text-zinc-500">
          {PLACEHOLDER.solutionIntro}
        </p>
        <div className="flex flex-col gap-12">{rows}</div>
      </div>
    </section>
  )
}

function ScreenSlot({ label, fullWidth = false }: { label: string; fullWidth?: boolean }) {
  return (
    <figure className={fullWidth ? 'w-full' : ''}>
      <div
        role="img"
        aria-label={`${label} placeholder`}
        className={`flex w-full items-center justify-center border-[3px] border-black bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
          fullWidth ? 'aspect-[16/9]' : 'aspect-[4/5]'
        }`}
      >
        <span className="px-4 text-center font-mono text-xs font-bold uppercase tracking-widest text-white">
          {label}
        </span>
      </div>
      <figcaption className="mt-3 font-mono text-xs font-bold uppercase tracking-widest text-zinc-500">
        Why this decision was made — replace with real annotation.
      </figcaption>
    </figure>
  )
}

// ── 08 Metric Impact & Retrospective ────────────────────────────────────────

function ImpactRetrospectiveSection() {
  return (
    <section className={`${SECTION} bg-white`} aria-labelledby="impact-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="08" title="Metric Impact & Retrospective" />

        <div
          className={`mb-12 grid grid-cols-1 overflow-hidden sm:grid-cols-3 ${CARD}`}
          role="list"
          aria-label="Project impact statistics"
        >
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              role="listitem"
              className={`flex flex-col items-center justify-center bg-zinc-100 px-6 py-8 text-center ${
                index > 0 ? 'sm:border-l-[3px] sm:border-black' : ''
              } ${index > 0 ? 'border-t-[3px] border-black sm:border-t-0' : ''}`}
            >
              <p className="font-mono text-3xl font-extrabold text-black lg:text-4xl">{stat.value}</p>
              <p className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-zinc-500 opacity-60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/*
          QUANTIFIED OUTCOME (default below).
          If no metric exists, swap the large stat for a qualitative headline.
        */}
        <div className={`${CARD} mb-12 bg-amber-400 p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-12`}>
          <h3
            id="impact-heading"
            className="font-mono text-3xl font-semibold uppercase leading-tight tracking-tight text-black lg:text-4xl"
          >
            {PLACEHOLDER.outcomeStat}
          </h3>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black">{PLACEHOLDER.outcomeBody}</p>
        </div>

        <div className="mb-12 mx-auto max-w-[65ch] text-center">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-zinc-400 opacity-50">
            Honest Reflection
          </p>
          <p className="text-base leading-relaxed text-zinc-500">{PLACEHOLDER.reflection}</p>
        </div>

        <div className="flex justify-center">
          <BrutalistButton
            type="button"
            shadowColorClass="bg-amber-400"
            className="px-10 py-4 text-xs uppercase tracking-wider"
            onClick={() => window.open('/porvenix-mockup.png', '_blank')}
          >
            Download Case Study
          </BrutalistButton>
        </div>
      </div>
    </section>
  )
}

// ── Nav ─────────────────────────────────────────────────────────────────────

function CaseStudyNav({
  prevSlug,
  prevName,
  nextSlug,
  nextName,
}: {
  prevSlug: string
  prevName: string
  nextSlug: string
  nextName: string
}) {
  const navigate = useNavigate()

  const navBlock =
    'group block border-[3px] border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'

  return (
    <nav
      className={`${SECTION} border-t-[3px] border-black bg-white`}
      aria-label="Case study project navigation"
    >
      <div className={CONTENT}>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <Link to={`/work/${prevSlug}`} className={navBlock} aria-label={`Previous project: ${prevName}`}>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
              ← Prev Project
            </p>
            <p className="mt-2 text-lg font-semibold text-black">{prevName}</p>
          </Link>

          <div className="flex justify-center">
            <BrutalistButton
              type="button"
              onClick={() => navigate('/projects')}
              className="px-8 py-3 text-xs uppercase tracking-wider"
            >
              All Work
            </BrutalistButton>
          </div>

          <Link
            to={`/work/${nextSlug}`}
            className={`${navBlock} text-right`}
            aria-label={`Next project: ${nextName}`}
          >
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
              Next Project →
            </p>
            <p className="mt-2 text-lg font-semibold text-black">{nextName}</p>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default function CaseStudyTemplate() {
  const { slug } = useParams()
  const study = STUDIES[(slug as StudySlug) ?? 'porvenix'] ?? STUDIES.porvenix

  return (
    <article key={slug} className="w-full bg-[#f6f8fa] pt-16 text-black">
      <HeroMockup title={study.projectTitle} meta={study.heroMeta} heroSrc={study.heroSrc} />
      <ContextDashboard />
      <ProblemSpaceSection />
      <ResearchSection />
      <ExperienceMappingSection />
      <UiConceptsSection />
      <DesignSystemSection />
      <HighFidelitySection />
      <ImpactRetrospectiveSection />
      <CaseStudyNav
        prevSlug={study.prevSlug}
        prevName={study.prevName}
        nextSlug={study.nextSlug}
        nextName={study.nextName}
      />
    </article>
  )
}
