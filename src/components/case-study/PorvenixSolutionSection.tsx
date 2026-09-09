import { type ReactNode } from 'react'

const FRAME_CLASS = 'overflow-hidden rounded-2xl border-2 border-black'

/** Cap display height while preserving intrinsic aspect ratio (no stretch/upscale). */
const SCREENSHOT_MAX_HEIGHT_PX = 720

const INTRO =
  'Every screen here was designed directly in high fidelity — no separate wireframe phase — using Cursor as an AI-assisted workflow, compressed into the six-week deadline.'

type SolutionScreen = {
  number: string
  src: string
  alt: string
  caption: string
  reasoning: string
  width: number
  height: number
}

const DISCOVERING_A_MARKET: SolutionScreen[] = [
  {
    number: '01',
    src: '/porvenix-solution-market-feed.png',
    alt: 'Porvenix market feed showing a grid of prediction market cards',
    caption: 'Market feed (grid of cards)',
    width: 2880,
    height: 1556,
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
    width: 2880,
    height: 322,
  },
  {
    number: '03',
    src: '/porvenix-solution-featured-market.png',
    alt: 'Porvenix featured market card with odds chart visible before login',
    caption: 'Featured market with odds chart',
    width: 2880,
    height: 1204,
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
    width: 2880,
    height: 1624,
  },
  {
    number: '05',
    src: '/porvenix-solution-live-sidebar.png',
    alt: 'Porvenix Live now and Hot today sidebar widgets',
    caption: '"Live now" / "Hot today" sidebar',
    reasoning:
      'With no backend support for real-time odds, trending and live-activity signals surface momentum without needing push updates — turning a technical constraint into a visible design decision instead of hiding it.',
    width: 698,
    height: 706,
  },
]

const PLACING_A_BET_SCREENSHOT: SolutionScreen = {
  number: '01',
  src: '/porvenix-solution-referral-modal.png',
  alt: 'Porvenix referral code modal gating trading access',
  caption: 'Referral code modal',
  reasoning:
    'Access launched referral-gated rather than open to everyone — a deliberate rollout decision, not a technical limitation.',
  width: 2880,
  height: 1624,
}

const PLACING_A_BET_SCREENSHOTS: SolutionScreen[] = [
  {
    number: '02',
    src: '/porvenix-solution-quick-bet-modal.png',
    alt: 'Porvenix quick-bet modal triggered from a homepage market card',
    caption: 'Quick-bet modal from feed',
    width: 2880,
    height: 1494,
    reasoning:
      'A bet can be placed directly from the feed without opening the market\'s own page — selecting Yes/No and an amount surfaces the same buy logic inline, for users who already know what they want.',
  },
  {
    number: '03',
    src: '/porvenix-solution-market-detail.png',
    alt: 'Porvenix market detail page with price chart and buy panel',
    caption: 'Market detail with buy panel',
    reasoning:
      'The same buy action is also available from the market\'s detail page, alongside the full price chart — for users who want context before committing. Both paths converge on identical logic: price, amount, potential return, and a funding gate before confirmation.',
    width: 2880,
    height: 1558,
  },
]

const PLACING_A_BET_CLOSING =
  'Completing an actual trade requires a funded account, which fell outside what could be captured for this case study.'

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

function getScreenshotFrameWidth(width: number, height: number) {
  const maxWidthAtHeightCap = (SCREENSHOT_MAX_HEIGHT_PX * width) / height
  return Math.min(width, maxWidthAtHeightCap)
}

function SolutionScreenshotFrame({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  const frameWidth = getScreenshotFrameWidth(width, height)

  return (
    <div className="flex w-full justify-center">
      <div className={`${FRAME_CLASS} inline-block max-w-full bg-black`}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="block h-auto max-w-full"
          style={{
            width: `min(100%, ${frameWidth}px)`,
            aspectRatio: `${width} / ${height}`,
          }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}

function SolutionCaption({
  number,
  caption,
  reasoning,
  alignRight = false,
}: {
  number: string
  caption: string
  reasoning?: string
  alignRight?: boolean
}) {
  return (
    <figcaption
      className={`mt-8 max-w-3xl ${alignRight ? 'ml-auto text-right' : ''}`}
    >
      <SolutionStepLabel number={number} caption={caption} />
      {reasoning ? (
        <blockquote
          className={`mt-6 text-base font-semibold leading-relaxed text-zinc-800 sm:text-lg ${
            alignRight
              ? 'border-r-[3px] border-orange-500 pr-5'
              : 'border-l-[3px] border-orange-500 pl-5'
          }`}
        >
          {reasoning}
        </blockquote>
      ) : null}
    </figcaption>
  )
}

function SolutionShowcaseRow({
  number,
  src,
  alt,
  caption,
  reasoning,
  width,
  height,
  alignRight = false,
}: SolutionScreen & { alignRight?: boolean }) {
  return (
    <figure className="mb-24 w-full">
      <SolutionScreenshotFrame src={src} alt={alt} width={width} height={height} />
      <SolutionCaption
        number={number}
        caption={caption}
        reasoning={reasoning}
        alignRight={alignRight}
      />
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
          <SolutionShowcaseRow key={item.src} {...item} alignRight={index % 2 === 1} />
        ))}
      </SolutionSubsection>

      <SolutionSubsection
        title="Placing a bet"
        subLabel="The core flow, once a user is in."
      >
        <SolutionShowcaseRow {...PLACING_A_BET_SCREENSHOT} />

        {PLACING_A_BET_SCREENSHOTS.map((item, index) => (
          <SolutionShowcaseRow
            key={item.src}
            {...item}
            alignRight={(index + 1) % 2 === 1}
          />
        ))}

        <p className="mt-2 max-w-3xl text-sm italic leading-relaxed text-zinc-500">
          {PLACING_A_BET_CLOSING}
        </p>
      </SolutionSubsection>
    </>
  )
}
