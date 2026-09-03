import { type ProjectCardData } from '../components/ProjectCard'

// coverClass values are complete literal strings so Tailwind can statically
// detect and include the gradient classes during the build.
export const FEATURED_PROJECTS: ProjectCardData[] = [
  {
    title: 'Porvenix',
    subtitle: 'Prediction Markets · Product Design',
    description:
      'End-to-end design and build of a real-money prediction markets platform. Designed a four-card-type market system and three-tier navigation architecture handling $3.8B+ in live trading volume across 14 categories.',
    tags: ['Product Design', 'Information Architecture', 'Interaction Design', 'Cursor AI'],
    coverImage: '/porvenix-card-hero.png',
    coverImageAlt: 'Porvenix logged-in market feed showing three-tier navigation and market card grid',
    href: '/work/porvenix',
  },
  {
    title: 'Onboarding Flow Redesign',
    subtitle: 'B2B SaaS · Interaction Design',
    description:
      'Ran 12 user interviews to find where and why users abandoned a 7-step onboarding flow. Rebuilt around progressive disclosure — 38% drop-off reduction, NPS improved from 22 → 61 in 90 days post-launch.',
    tags: ['UX Research', 'Interaction Design', 'Information Architecture', 'Prototyping'],
    coverClass: 'bg-gradient-to-br from-sky-950 via-blue-900 to-blue-600',
    href: '/work/onboarding-flow',
  },
  {
    title: 'Fintech Design System',
    subtitle: 'Multi-team Platform · Systems Design',
    description:
      'Built a token-based design system from scratch for a fintech platform spanning four product teams — cutting handoff time by 50% and enabling three new products to ship in six weeks.',
    tags: ['Design Systems', 'Figma', 'Component Architecture', 'Documentation'],
    coverClass: 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-600',
    href: '/work/fintech-design-system',
  },
  {
    title: 'Mobile Banking App',
    subtitle: 'Consumer FinTech · Mobile UX',
    description:
      'Redesigned complex financial data from raw numbers into contextual charts, goal tracking, and nudges that explain rather than just display. Daily active usage up 2.4×, "confusion" support tickets dropped 60%.',
    tags: ['Data Visualization', 'Mobile UX', 'User Research', 'Interaction Design'],
    coverClass: 'bg-gradient-to-br from-rose-950 via-rose-800 to-rose-600',
    href: '/work/mobile-banking',
  },
]
