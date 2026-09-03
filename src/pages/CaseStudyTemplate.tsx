import { type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BrutalistButton from '../components/BrutalistButton'
import CaseStudySectionLabel from '../components/case-study/CaseStudySectionLabel'
import ImagePlaceholder from '../components/case-study/ImagePlaceholder'
import OffsetCard from '../components/case-study/OffsetCard'
import SectionBackdrop from '../components/portfolio/SectionBackdrop'

// ── Shared layout tokens (match site: px-6 py-24, max-w-6xl) ────────────────

const CONTENT = 'mx-auto w-full max-w-6xl px-6'
const SECTION = 'py-24'
const PILL =
  'rounded-full border border-zinc-200 bg-[#fcfbfa] px-3 py-1 text-xs font-medium text-zinc-600'
const META_PILL =
  'rounded-full border-2 border-black bg-black px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-white'

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

const PORVENIX_CONTEXT = {
  role: 'Product Designer',
  timeline: '~6 weeks',
  tools: ['Figma', 'FigJam', 'Cursor', 'Claude'] as const,
  roleItems: [
    'Sole product designer — owned interaction design and IA end-to-end',
    'Designed the four-card market system and three-tier navigation architecture from scratch, with no existing design system to build from',
    'Ran user research independently (interviews, usability sessions)',
    'Collaborated with 1 PM, 1 tech lead, 3 engineers (1 frontend, 2 backend), 1 QA',
  ],
  constraints: [
    'Fixed, non-negotiable delivery deadline',
    'No prior design system — every component, token, and pattern built from zero',
    "Backend couldn't support real-time odds updates, forcing design decisions around data staleness (polling intervals instead of live push)",
  ],
} as const

const PORVENIX_TEAM_CHIPS = [
  '1 PM',
  '1 Tech Lead',
  '3 Engineers (1 Frontend, 2 Backend)',
  '1 QA',
] as const

const PORVENIX_SOLUTION = [
  {
    caption: 'Low-fi market browse structure',
    src: null,
    placeholder: '[Add screenshot: low-fi wireframe]',
  },
  {
    caption: 'Tokens and components before paint',
    src: null,
    placeholder: '[Add screenshot: design system tokens/components]',
  },
  {
    caption: 'Logged-in market feed',
    src: '/porvenix-card-hero.png',
    placeholder: null,
  },
  {
    caption: 'High-fidelity product UI',
    src: '/porvenix-case-hero.png',
    placeholder: null,
  },
] as const

const PORVENIX_PROBLEM = {
  hook: 'Prediction markets were built for traders, not for phones — and that gap was the opportunity.',
  body: [
    'A review of existing platforms — Polymarket, Kalshi — showed dense, trading-terminal interfaces adapted for mobile screens rather than designed for them: dense tables, multi-step order flows, and terminology that assumes a level of market literacy most mobile users don\'t have.',
    'Porvenix set out to build the reverse — a prediction markets platform designed mobile-first from the ground up, where browsing markets, reading odds, and understanding a bet takes seconds, not a learning curve borrowed from a trading terminal.',
    'No formal user segmentation existed at project start. Based on the platform\'s scope — spanning sports, politics, crypto, and culture — the design targeted casually news-engaged mobile users, not existing traders, since the product\'s own category mix made clear the audience would skew broader than finance-literate power users.',
  ],
} as const

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
    <header className="w-full">
      <div className={`${CONTENT} pb-12 pt-10 md:pb-16 md:pt-14`}>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-zinc-900 lg:text-5xl">
          {title}
        </h1>
        <p className="mt-5">
          <span className={META_PILL}>{meta}</span>
        </p>

        <div className="mt-10">
          <OffsetCard>
            <img src={heroSrc} alt={`${title} product mockup`} className="block h-auto w-full" />
          </OffsetCard>
        </div>
      </div>
    </header>
  )
}

// ── 01 Context Dashboard ────────────────────────────────────────────────────

function ContextDashboard({
  role = CONTEXT_DASHBOARD.role,
  timeline = CONTEXT_DASHBOARD.timeline,
  tools = CONTEXT_DASHBOARD.tools,
  roleItems = ROLE_ITEMS,
  constraints = CONSTRAINT_ITEMS,
}: {
  role?: string
  timeline?: string
  tools?: readonly string[]
  roleItems?: readonly string[]
  constraints?: readonly string[]
}) {
  return (
    <section className={SECTION} aria-labelledby="context-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="01" title="The Setup" />
        <p id="context-heading" className="sr-only">
          Role, timeline, and tools
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <OffsetCard innerClassName="bg-[#fcfbfa] p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Role
            </p>
            <p className="mb-6 text-lg font-semibold tracking-tight text-zinc-900">{role}</p>
            <ul className="space-y-3">
              {roleItems.map(item => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-600">
                  <span className="mt-0.5 shrink-0 text-sm font-semibold text-blue-600">■</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </OffsetCard>

          <OffsetCard innerClassName="bg-[#fcfbfa] p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Timeline
            </p>
            <p className="mb-6 text-lg font-semibold tracking-tight text-zinc-900">{timeline}</p>
            <ul className="space-y-3">
              {constraints.map(item => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-600">
                  <span className="mt-0.5 shrink-0 text-sm font-semibold text-orange-500">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </OffsetCard>

          <OffsetCard innerClassName="bg-[#fcfbfa] p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Tools Used
            </p>
            <div className="flex flex-wrap gap-2">
              {tools.map(tool => (
                <span key={tool} className={PILL}>
                  {tool}
                </span>
              ))}
            </div>
          </OffsetCard>
        </div>
      </div>
    </section>
  )
}

// ── 02 Problem Space ────────────────────────────────────────────────────────

function ProblemSpaceSection({
  hook = PLACEHOLDER.hook,
  body,
  number = '02',
  title = 'The Problem Space',
}: {
  hook?: string
  body?: readonly string[]
  number?: string
  title?: string
}) {
  const paragraphs = body ?? [
    PLACEHOLDER.problemBody,
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
  ]

  return (
    <section className={SECTION} aria-labelledby="problem-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number={number} title={title} />

        <p className="mb-12 max-w-4xl text-2xl font-semibold leading-snug tracking-tight text-black lg:text-3xl">
          {hook}
        </p>

        <div className="grid grid-cols-1 items-start gap-12 overflow-visible lg:grid-cols-12">
          <div className="lg:col-span-7">
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-base leading-relaxed text-zinc-500${index > 0 ? ' mt-4' : ''}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="overflow-visible lg:col-span-5">
            <OffsetCard innerClassName="bg-blue-600 p-8" shadowClassName="bg-black">
              <blockquote>
                <p className="text-sm font-semibold uppercase leading-relaxed tracking-wide text-white">
                  {PLACEHOLDER.pullQuote}
                </p>
              </blockquote>
            </OffsetCard>
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
            <span key={chip} className={PILL}>
              {chip}
            </span>
          ))}
        </div>

        <OffsetCard>
          <ul className="divide-y-2 divide-black">
            {RESEARCH_INSIGHTS.map((insight, index) => (
              <li key={insight} className="flex items-start gap-4 px-6 py-5 md:px-8">
                <span className="text-sm font-semibold text-blue-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-base font-semibold leading-relaxed text-zinc-900">{insight}</p>
              </li>
            ))}
          </ul>
        </OffsetCard>
      </div>
    </section>
  )
}

// ── 04 Experience Mapping & IA ──────────────────────────────────────────────

function ExperienceMappingSection() {
  return (
    <section className={SECTION} aria-labelledby="ia-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="04" title="Experience Mapping & IA" />
        <p id="ia-heading" className="sr-only">
          User journey and information architecture
        </p>

        <div className="flex flex-col gap-8">
          {IA_STEPS.map(step => (
            <OffsetCard key={step.number}>
              <article className="relative">
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-blue-600" aria-hidden="true" />
                <div className="grid grid-cols-1 gap-6 p-8 pl-10 md:grid-cols-12">
                  <div className="md:col-span-2">
                    <p className="text-5xl font-semibold leading-none tracking-tight text-blue-600">
                      {step.number}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      {step.label}
                    </p>
                  </div>
                  <div className="space-y-4 md:col-span-10">
                    <p className="text-base font-semibold leading-relaxed text-zinc-900">{step.choice}</p>
                    <p className="text-base leading-relaxed text-zinc-500">{step.why}</p>
                  </div>
                </div>
              </article>
            </OffsetCard>
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
              <figcaption className="mt-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
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
    <section className={SECTION} aria-labelledby="system-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="06" title="UI Design System Core" />
        <p id="system-heading" className="sr-only">
          Auto-layout, tokens, and components
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {SYSTEM_CORE.map(item => (
            <OffsetCard key={item.step} innerClassName="bg-[#fcfbfa] p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600">
                Step {item.step}
              </p>
              <h3 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{item.body}</p>
            </OffsetCard>
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
      <OffsetCard innerClassName="bg-zinc-900" shadowClassName="bg-blue-600">
        <div
          role="img"
          aria-label={`${label} placeholder`}
          className={`flex w-full items-center justify-center ${
            fullWidth ? 'aspect-[16/9]' : 'aspect-[4/5]'
          }`}
        >
          <span className="px-4 text-center text-xs font-medium uppercase tracking-widest text-white">
            {label}
          </span>
        </div>
      </OffsetCard>
      <figcaption className="mt-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
        Why this decision was made — replace with real annotation.
      </figcaption>
    </figure>
  )
}

// ── 08 Metric Impact & Retrospective ────────────────────────────────────────

function ImpactRetrospectiveSection({
  number = '08',
  title = 'Metric Impact & Retrospective',
  oversizedMetrics = false,
}: {
  number?: string
  title?: string
  oversizedMetrics?: boolean
}) {
  return (
    <section className={SECTION} aria-labelledby="impact-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number={number} title={title} />

        <OffsetCard className="mb-12">
          <div
            className="grid grid-cols-1 overflow-hidden sm:grid-cols-3"
            role="list"
            aria-label="Project impact statistics"
          >
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                role="listitem"
                className={`flex flex-col items-center justify-center px-6 py-8 text-center ${
                  index > 0 ? 'sm:border-l-2 sm:border-black' : ''
                } ${index > 0 ? 'border-t-2 border-black sm:border-t-0' : ''}`}
              >
                <p
                  className={
                    oversizedMetrics
                      ? 'text-5xl font-semibold leading-none tracking-tight text-zinc-900 lg:text-6xl'
                      : 'text-3xl font-semibold tracking-tight text-zinc-900 lg:text-4xl'
                  }
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </OffsetCard>

        <OffsetCard className="mb-12" innerClassName="bg-[#fcfbfa] p-10 md:p-12">
          <h3
            id="impact-heading"
            className={
              oversizedMetrics
                ? 'text-3xl font-semibold leading-tight tracking-tight text-zinc-900 lg:text-4xl'
                : 'text-2xl font-semibold leading-tight tracking-tight text-zinc-900 lg:text-3xl'
            }
          >
            {PLACEHOLDER.outcomeStat}
          </h3>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-500">{PLACEHOLDER.outcomeBody}</p>
        </OffsetCard>

        <div className="mb-12 mx-auto max-w-[65ch] text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Honest Reflection
          </p>
          <p className="text-base leading-relaxed text-zinc-500">{PLACEHOLDER.reflection}</p>
        </div>

        <div className="flex justify-center">
          <BrutalistButton
            type="button"
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

// ── Porvenix — 5-section layout ─────────────────────────────────────────────

function PorvenixSnapshot() {
  const snapshotCard =
    'flex h-full w-full flex-col justify-center rounded-2xl border-[3px] border-black bg-[#fcfbfa] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:p-8'
  const snapshotLabel =
    'text-[10px] font-semibold uppercase tracking-widest text-orange-500'
  const decisionNumber =
    'text-[10px] font-semibold uppercase tracking-widest text-blue-600'

  return (
    <section className={SECTION} aria-labelledby="snapshot-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="01" title="Snapshot" />
        <p id="snapshot-heading" className="sr-only">
          Role, team, timeline, and tools
        </p>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:[grid-auto-rows:1fr] lg:grid-cols-4">
          <div className="h-full min-h-[11rem]">
            <article className={snapshotCard}>
              <div className="flex items-center justify-between gap-3">
                <p className={snapshotLabel}>Role</p>
                <span className="rounded-full border-2 border-black bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-900">
                  Sole designer
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-zinc-900 lg:text-3xl">
                {PORVENIX_CONTEXT.role}
              </p>
            </article>
          </div>

          <div className="h-full min-h-[11rem]">
            <article className={snapshotCard}>
              <p className={snapshotLabel}>Timeline</p>
              <p className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-zinc-900 lg:text-3xl">
                {PORVENIX_CONTEXT.timeline}
              </p>
            </article>
          </div>

          <div className="h-full min-h-[11rem]">
            <article className={snapshotCard}>
              <p className={snapshotLabel}>Team</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {PORVENIX_TEAM_CHIPS.map(chip => (
                  <span key={chip} className={PILL}>
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          </div>

          <div className="h-full min-h-[11rem]">
            <article className={snapshotCard}>
              <div className="flex items-center justify-between gap-3">
                <p className={snapshotLabel}>Tools</p>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                  {PORVENIX_CONTEXT.tools.length} tools
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {PORVENIX_CONTEXT.tools.map(tool => (
                  <span key={tool} className={`${PILL} inline-flex items-center gap-1.5`}>
                    {tool === 'Figma' ? (
                      <img
                        src="/logo-illustrator.png"
                        alt=""
                        className="h-4 w-4 object-contain"
                        draggable={false}
                      />
                    ) : null}
                    {tool === 'Cursor' ? (
                      <img
                        src="/logo-claude.png"
                        alt=""
                        className="h-4 w-4 object-contain"
                        draggable={false}
                      />
                    ) : null}
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>

        <ul
          className="mt-6 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:[grid-auto-rows:1fr]"
          aria-label="Project constraints"
        >
          {PORVENIX_CONTEXT.constraints.map((item, index) => (
            <li key={item} className="h-full min-h-0">
              <article className={snapshotCard}>
                <p className={decisionNumber}>
                  {String(index + 1).padStart(2, '0')} Constraint
                </p>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-zinc-900">{item}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function PorvenixKeyDecisions() {
  return (
    <section className={SECTION} aria-labelledby="decisions-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="03" title="Key Decisions" />
        <p id="decisions-heading" className="sr-only">
          Key product decisions
        </p>
        <p className="mb-10 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
          Based on 12 interviews, usability sessions, and analytics review
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {IA_STEPS.map(step => (
            <OffsetCard key={step.number} innerClassName="flex flex-col bg-[#fcfbfa] p-6 md:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-600">
                {step.number} {step.label}
              </p>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-zinc-900">
                {step.choice} {step.why}
              </p>
            </OffsetCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function PorvenixSolution() {
  return (
    <section className={SECTION} aria-labelledby="solution-heading">
      <div className={CONTENT}>
        <CaseStudySectionLabel number="04" title="The Solution" />
        <p id="solution-heading" className="sr-only">
          From wireframe to high-fidelity
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PORVENIX_SOLUTION.map(stage => (
            <figure key={stage.caption}>
              {stage.src ? (
                <OffsetCard>
                  <img
                    src={stage.src}
                    alt={stage.caption}
                    className="block aspect-[4/5] h-auto w-full object-cover object-top"
                  />
                </OffsetCard>
              ) : (
                <ImagePlaceholder
                  label={stage.placeholder ?? ''}
                  ariaLabel={stage.placeholder ?? stage.caption}
                  className="aspect-[4/5] w-full bg-zinc-100"
                />
              )}
              <figcaption className="mt-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
                {stage.caption}
              </figcaption>
            </figure>
          ))}
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

  return (
    <nav className={SECTION} aria-label="Case study project navigation">
      <div className={CONTENT}>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <Link
            to={`/work/${prevSlug}`}
            className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-label={`Previous project: ${prevName}`}
          >
            <OffsetCard innerClassName="bg-[#fcfbfa] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                ← Prev Project
              </p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">{prevName}</p>
            </OffsetCard>
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
            className="rounded-2xl text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-label={`Next project: ${nextName}`}
          >
            <OffsetCard innerClassName="bg-[#fcfbfa] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Next Project →
              </p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">{nextName}</p>
            </OffsetCard>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default function CaseStudyTemplate() {
  const { slug } = useParams()
  const study = STUDIES[(slug as StudySlug) ?? 'porvenix'] ?? STUDIES.porvenix
  const isPorvenix = slug === 'porvenix'

  return (
    <article key={slug} className="relative w-full overflow-x-hidden bg-[#f6f8fa] pt-16 text-black">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <SectionBackdrop />
      </div>
      <div className="relative z-10">
      <HeroMockup title={study.projectTitle} meta={study.heroMeta} heroSrc={study.heroSrc} />
      {isPorvenix ? (
        <>
          <PorvenixSnapshot />
          <ProblemSpaceSection
            {...PORVENIX_PROBLEM}
            number="02"
            title="The Problem"
          />
          <PorvenixKeyDecisions />
          <PorvenixSolution />
          <ImpactRetrospectiveSection
            number="05"
            title="Impact & Reflection"
            oversizedMetrics
          />
        </>
      ) : (
        <>
          <ContextDashboard />
          <ProblemSpaceSection />
          <ResearchSection />
          <ExperienceMappingSection />
          <UiConceptsSection />
          <DesignSystemSection />
          <HighFidelitySection />
          <ImpactRetrospectiveSection />
        </>
      )}
      <CaseStudyNav
        prevSlug={study.prevSlug}
        prevName={study.prevName}
        nextSlug={study.nextSlug}
        nextName={study.nextName}
      />
      </div>
    </article>
  )
}
