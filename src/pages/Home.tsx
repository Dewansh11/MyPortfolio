import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { type ProjectCardData } from '../components/ProjectCard'
import BrutalistButton from '../components/BrutalistButton'
import MyProcess from '../components/MyProcess'
import KeycapNav from '../components/portfolio/KeycapNav'
import HeroStickyNotes from '../components/portfolio/HeroStickyNotes'
import CuratorAbout from '../components/portfolio/CuratorAbout'
import ExperienceSection from '../components/portfolio/ExperienceSection'
import FooterGameSection from '../components/portfolio/FooterGameSection'
import FeaturedProjectsStack from '../components/portfolio/FeaturedProjectsStack'
import SectionErrorBoundary from '../components/SectionErrorBoundary'
import SectionBackdrop from '../components/portfolio/SectionBackdrop'

// ── Cycling words ─────────────────────────────────────────────────────────────
const CYCLING_WORDS = ['products', 'systems', 'workflows'] as const

const FLIP_TRANSITION = { duration: 0.55, ease: [0.33, 1, 0.68, 1] as const }

function CyclingFlipWord({ word }: { word: string }) {
  return (
    <span className="my-1 block overflow-visible lg:my-2">
      <span
        className="relative inline-flex h-20 min-w-[12rem] items-center justify-center text-5xl font-semibold leading-none lg:h-28 lg:min-w-[14rem] lg:text-7xl"
        style={{ perspective: '800px' }}
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            initial={{ rotateX: 75, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -75, opacity: 0 }}
            transition={FLIP_TRANSITION}
            className="inline-block italic leading-none text-blue-600"
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

// ── Project data ─────────────────────────────────────────────────────────────
// coverClass values are complete literal strings so Tailwind can statically
// detect and include the gradient classes during the build.
const FEATURED_PROJECTS: ProjectCardData[] = [
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

// ── Skills marquee data ───────────────────────────────────────────────────────
const MARQUEE_SKILLS = [
  'UX Strategy',
  'Design Systems',
  'Accessibility Design',
  'Vibe Coding',
  'Product Thinking',
  'Behavioral Design',
  'Rapid Prototyping',
  'User Research',
  'Interaction Design',
  'Systems Thinking',
  'Figma',
  'UX Writing',
]

// ── Marquee star icon ─────────────────────────────────────────────────────────
function MarqueeStar() {
  return (
    <svg
      className="marquee-star"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 0.5L9.2 6.3L15 7.5L9.2 8.7L8 14.5L6.8 8.7L1 7.5L6.8 6.3L8 0.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

// ── Skills marquee strip ──────────────────────────────────────────────────────
function SkillsMarquee() {
  return (
    <div className="marquee-track w-full">
      <div className="marquee-inner">
        {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((skill, i) => (
          <span key={`${skill}-${i}`} className="marquee-item">
            <span className="marquee-skill">{skill}</span>
            <MarqueeStar />
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Home ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [wordIndex, setWordIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % CYCLING_WORDS.length),
      2400,
    )
    return () => clearInterval(id)
  }, [])

  // Scroll to anchor when landing with hash (e.g. /#about-bento)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return
    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <KeycapNav />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section id="hero" className="figjam-canvas relative flex min-h-screen w-full items-center justify-center px-6 pb-16 pt-24">
        <HeroStickyNotes />
        <div className="mx-auto w-full max-w-3xl overflow-visible text-center">

          {/* Animated availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm"
          >
            {/* Pulsing availability dot */}
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium tracking-wide text-zinc-600">
              Available for new projects
            </span>
          </motion.div>

          {/* Headline — staggered entrance after badge */}
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 lg:text-7xl">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              I design
            </motion.span>

            {/* Cycling word — 3D flip (no transform on parent — preserves perspective) */}
            <CyclingFlipWord word={CYCLING_WORDS[wordIndex]} />

            <motion.span
              className="block text-zinc-400"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              that turn complexity
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              into clarity.
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-zinc-500"
          >
            UX Designer focused on research-driven product design, design systems,
            and turning messy problems into clean experiences.
          </motion.p>

          {/* CTAs — equal-width pill pair, centred under the paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.45, ease: 'easeOut' }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          >
            {/* Each sibling div is w-full on mobile, fixed w-48 on sm+.
                fullWidth makes BrutalistButton fill that container so
                both pills are always the same width at every breakpoint. */}
            <div className="w-full sm:w-48">
              <BrutalistButton
                fullWidth
                onClick={() => navigate('/projects')}
                className="py-3 text-sm"
              >
                View My Work
              </BrutalistButton>
            </div>

            <div className="w-full sm:w-48">
              <BrutalistButton
                fullWidth
                onClick={() => navigate('/resume')}
                shadowColorClass="bg-zinc-700"
                borderColorClass="border-zinc-700"
                className="py-3 text-sm text-zinc-700"
              >
                Resume
              </BrutalistButton>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 text-xs tracking-widest text-zinc-400 uppercase"
          >
            Scroll to explore
          </motion.p>
        </div>
      </section>

      {/* ── Skills Marquee ────────────────────────────────────────────────────── */}
      <SkillsMarquee />

      {/* ── Post-hero studio canvas (unified process atmosphere) ───────────── */}
      <div className="post-hero-studio relative overflow-x-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <SectionBackdrop />
        </div>

        <div className="relative z-10">
      {/* ── Featured Work ─────────────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-24">
        <div className="mx-auto max-w-6xl">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Selected Work
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
              Featured Projects
            </h2>
          </motion.div>

          <FeaturedProjectsStack projects={FEATURED_PROJECTS} />

          {/* Inline link to full projects page */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              View all case studies
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── My Process ──────────────────────────────────────────────────────── */}
      <SectionErrorBoundary name="My Process">
        <MyProcess />
      </SectionErrorBoundary>

      {/* ── About Bento ─────────────────────────────────────────────────────── */}
      <SectionErrorBoundary name="About Me">
        <CuratorAbout />
      </SectionErrorBoundary>

      {/* ── Experience ──────────────────────────────────────────────────────── */}
      <SectionErrorBoundary name="Experience">
        <ExperienceSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary name="Game Footer">
        <FooterGameSection />
      </SectionErrorBoundary>

        </div>
      </div>
    </>
  )
}
