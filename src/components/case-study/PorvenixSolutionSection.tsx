import { type ReactNode } from 'react'

const FRAME_CLASS =
  'overflow-hidden rounded-2xl border-2 border-black'

const SCREENSHOT_MAX_HEIGHT = 520

const INTRO =
  'Every screen here was designed directly in high fidelity — no separate wireframe phase — using Cursor as an AI-assisted workflow, compressed into the six-week deadline.'

const DISCOVERING_A_MARKET = [
  {
    number: '01',
    src: '/porvenix-solution-market-feed.png',
    alt: 'Porvenix market feed showing a grid of prediction market cards',
    caption: 'Market feed (grid of cards)',
    reasoning:
      'The four-card system — binary, multi-outcome, head-to-head, and price-threshold — lets one layout handle everything from a coin flip to a 50-candidate election without forcing every market into the same shape.',
  },
  {
    number: '02',
    src: '/porvenix-solution-navigation.png',
    alt: 'Porvenix navigation tiers with categories and trending tags',
    caption: 'Navigation tiers',
    reasoning:
      'Three navigation tiers — categories, trending tags, individual markets — let a casual user browse by topic without ever seeing an order book.',
  },
  {
    number: '03',
    src: '/porvenix-solution-featured-market.png',
    alt: 'Porvenix featured market card with odds chart visible before login',
    caption: 'Featured market with odds chart',
    reasoning:
      "A market's full odds history and price chart are visible before login — the platform's deepest data is the most public, not the most gated, so a visitor can evaluate a market before ever creating an account.",
  },
  {
    number: '04',
    src: '/porvenix-solution-login-modal.png',
    alt: 'Porvenix login and authentication gate modal',
    caption: 'Login/auth gate modal',
    reasoning:
      "Browsing and odds stay fully open — no login required. Identity is only requested when someone moves toward actually trading, and the product launched referral-gated on top of that, deliberately limiting early access rather than opening to everyone at once. Friction is layered by intent: look freely, log in when you're ready to act, unlock trading once invited.",
  },
  {
    number: '05',
    src: '/porvenix-solution-live-sidebar.png',
    alt: 'Porvenix Live now and Hot today sidebar widgets',
    caption: '"Live now" / "Hot today" sidebar',
    reasoning:
      'With no backend support for real-time odds, trending and live-activity signals surface momentum without needing push updates — turning a technical constraint into a visible design decision instead of hiding it.',
  },
] as const

const PLACING_A_BET_SCREENSHOT = {
  number: '01',
  src: '/porvenix-solution-referral-modal.png',
  alt: 'Porvenix referral code modal gating trading access',
  caption: 'Referral code modal',
  reasoning:
    'Access launched referral-gated rather than open to everyone — a deliberate rollout decision, not a technical limitation.',
} as const

const PLACING_A_BET_PLACEHOLDERS = [
  { number: '02', label: '[Add screenshot: selecting a side]' },
  { number: '03', label: '[Add screenshot: bet slip / amount entry]' },
  { number: '04', label: '[Add screenshot: confirm step]' },
  { number: '05', label: '[Add screenshot: post-bet state]' },
] as const

function SolutionSubLabel({ children }: { children: string }) {
  return (
    <p className="mb-12 flex items-center gap-3">
      <span className="block h-3 w-3 shrink-0 rounded-sm bg-orange-500" aria-hidden="true" />
      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {children}
      </span>
    </p>
  )
}

function SolutionStepLabel({ number, caption }: { number: string; caption: string }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">
        {number}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
        {caption}
      </span>
    </p>
  )
}

function SolutionScreenshotFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={`${FRAME_CLASS} bg-black`}>
      <div
        className="flex w-full items-center justify-center bg-black"
        style={{ maxHeight: SCREENSHOT_MAX_HEIGHT }}
      >
        <img
          src={src}
          alt={alt}
          className="block h-auto w-auto max-h-[520px] max-w-full object-contain"
        />
      </div>
    </div>
  )
}

function SolutionPlaceholderFrame({ label }: { label: string }) {
  return (
    <div className={`${FRAME_CLASS} bg-zinc-100`}>
      <div
        role="img"
        aria-label={label}
        className="flex min-h-[14rem] w-full items-center justify-center px-6"
        style={{ maxHeight: SCREENSHOT_MAX_HEIGHT }}
      >
        <span className="text-center text-xs font-medium uppercase tracking-widest text-zinc-500">
          {label}
        </span>
      </div>
    </div>
  )
}

function SolutionShowcaseRow({
  number,
  src,
  alt,
  caption,
  reasoning,
  reverse = false,
}: {
  number: string
  src: string
  alt: string
  caption: string
  reasoning: string
  reverse?: boolean
}) {
  return (
    <figure className="mb-20 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <div className={`min-w-0 w-full ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <SolutionScreenshotFrame src={src} alt={alt} />
      </div>
      <figcaption className={`min-w-0 lg:pt-2 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
        <SolutionStepLabel number={number} caption={caption} />
        <blockquote className="mt-6 border-l-[3px] border-orange-500 pl-5 text-base font-semibold leading-relaxed text-zinc-800">
          {reasoning}
        </blockquote>
      </figcaption>
    </figure>
  )
}

function SolutionPlaceholderRow({
  number,
  label,
  reverse = false,
}: {
  number: string
  label: string
  reverse?: boolean
}) {
  return (
    <figure className="mb-20 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <div className={`min-w-0 w-full ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <SolutionPlaceholderFrame label={label} />
      </div>
      <figcaption className={`min-w-0 lg:pt-2 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
        <SolutionStepLabel number={number} caption={label} />
      </figcaption>
    </figure>
  )
}

function SolutionSubsection({
  title,
  subLabel,
  children,
}: {
  title: string
  subLabel: string
  children: ReactNode
}) {
  return (
    <div className="mt-20 border-t-2 border-zinc-200 pt-16 first:mt-0 first:border-t-0 first:pt-0">
      <h3 className="mb-6 text-xl font-semibold tracking-tight text-zinc-900 md:text-2xl">
        {title}
      </h3>
      <SolutionSubLabel>{subLabel}</SolutionSubLabel>
      {children}
    </div>
  )
}

export default function PorvenixSolutionSection() {
  return (
    <>
      <p className="mb-6 max-w-3xl text-lg font-semibold leading-relaxed text-zinc-900">
        {INTRO}
      </p>

      <SolutionSubsection
        title="Discovering a market"
        subLabel="No login required to browse."
      >
        {DISCOVERING_A_MARKET.map((item, index) => (
          <SolutionShowcaseRow key={item.src} {...item} reverse={index % 2 === 1} />
        ))}
      </SolutionSubsection>

      <SolutionSubsection
        title="Placing a bet"
        subLabel="The core flow, once a user is in."
      >
        <SolutionShowcaseRow {...PLACING_A_BET_SCREENSHOT} reverse={false} />

        {PLACING_A_BET_PLACEHOLDERS.map((item, index) => (
          <SolutionPlaceholderRow
            key={item.label}
            number={item.number}
            label={item.label}
            reverse={(index + 1) % 2 === 1}
          />
        ))}
      </SolutionSubsection>
    </>
  )
}
