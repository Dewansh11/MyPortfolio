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
    title: 'Edme Insurance',
    subtitle: 'InsurTech · HR Insurance Platform',
    description:
      'Designing a smarter, simpler HR insurance platform. Edme provides a white-label insurance solution to organizations across India, enabling companies to offer insurance benefits to their employees under their own brand.',
    tags: ['InsurTech', 'B2C SaaS', 'Dashboard', 'Data Visualization'],
    coverClass: 'bg-gradient-to-br from-sky-950 via-blue-900 to-blue-600',
    comingSoon: true,
  },
  {
    title: 'Fintech Design System',
    subtitle: 'Multi-team Platform · Systems Design',
    description:
      'Built a token-based design system from scratch for a fintech platform spanning four product teams — cutting handoff time by 50% and enabling three new products to ship in six weeks.',
    tags: ['Design Systems', 'Figma', 'Component Architecture', 'Documentation'],
    coverClass: 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-600',
    comingSoon: true,
  },
  {
    title: 'Mobile Banking App',
    subtitle: 'Consumer FinTech · Mobile UX',
    description:
      'Redesigned complex financial data from raw numbers into contextual charts, goal tracking, and nudges that explain rather than just display. Daily active usage up 2.4×, "confusion" support tickets dropped 60%.',
    tags: ['Data Visualization', 'Mobile UX', 'User Research', 'Interaction Design'],
    coverClass: 'bg-gradient-to-br from-rose-950 via-rose-800 to-rose-600',
    comingSoon: true,
  },
]
