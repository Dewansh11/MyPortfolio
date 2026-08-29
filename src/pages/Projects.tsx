import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StickyNote from '../components/figjam/StickyNote'
import FigJamFrame from '../components/figjam/FigJamFrame'
import ConnectorLine from '../components/figjam/ConnectorLine'
import type { StickyColor } from '../components/figjam/StickyNote'

interface Project {
  title: string
  index: number
  problem: string
  solution: string
  outcome: string
  tags: string[]
  problemColor: StickyColor
  solutionColor: StickyColor
  outcomeColor: StickyColor
  href: string
}

const projects: Project[] = [
  {
    title: 'Porvenix',
    index: 1,
    problem: 'Prediction markets bury intent under dense cards, stacked nav, and unclear next actions.',
    solution: 'Four-card-type market system plus three-tier navigation across 14 live categories.',
    outcome: '$3.8B+ live trading volume handled through a designed information architecture.',
    tags: ['Product Design', 'Information Architecture', 'Interaction Design', 'Cursor AI'],
    problemColor: 'pink',
    solutionColor: 'yellow',
    outcomeColor: 'green',
    href: '/work/porvenix',
  },
  {
    title: 'Onboarding Flow Redesign',
    index: 2,
    problem: 'Users were dropping off at step 3 of 7. The flow was built for the system, not the user.',
    solution: 'Ran 12 user interviews, mapped mental models, collapsed 7 steps to 3 with progressive disclosure.',
    outcome: '38% reduction in drop-off. NPS improved from 22 → 61 in 90 days post-launch.',
    tags: ['UX Research', 'Information Architecture', 'Prototyping', 'Usability Testing'],
    problemColor: 'pink',
    solutionColor: 'yellow',
    outcomeColor: 'green',
    href: '/work/onboarding-flow',
  },
  {
    title: 'Fintech Design System',
    index: 3,
    problem: '4 product teams building the same components independently. Inconsistency everywhere.',
    solution: 'Token-based system in Figma with a React component library. Single source of truth.',
    outcome: 'Handoff time cut by 50%. 3 new products shipped in 6 weeks using the system.',
    tags: ['Design Systems', 'Figma', 'Component Architecture', 'Documentation'],
    problemColor: 'pink',
    solutionColor: 'purple',
    outcomeColor: 'green',
    href: '/work/fintech-design-system',
  },
  {
    title: 'Mobile Banking App',
    index: 4,
    problem: 'Complex financial data presented as raw numbers. Users couldn\'t understand their own money.',
    solution: 'Data visualization redesign — charts, goals, and contextual nudges that explain, not just display.',
    outcome: 'Daily active usage up 2.4×. Support tickets about "confusion" dropped 60%.',
    tags: ['Data Visualization', 'Mobile UX', 'User Research', 'Interaction Design'],
    problemColor: 'pink',
    solutionColor: 'blue',
    outcomeColor: 'green',
    href: '/work/mobile-banking',
  },
]

function ProjectCard({ project, i }: { project: Project; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 180, damping: 26, delay: i * 0.08 }}
    >
      <FigJamFrame label={`Case Study ${String(project.index).padStart(2, '0')}`}>
        <div className="space-y-6">

          {/* Project title */}
          <h2 className="text-xl font-semibold text-slate-900">{project.title}</h2>

          {/* Problem → Solution → Outcome connector chain */}
          <div className="flex flex-col gap-0 md:flex-row md:items-start md:gap-0">

            {/* Problem */}
            <div className="flex flex-col items-center md:items-start">
              <StickyNote color={project.problemColor} rotate={-1} delay={i * 0.1 + 0.1} className="w-full md:w-52">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Problem</p>
                <p className="text-xs leading-relaxed text-slate-700">{project.problem}</p>
              </StickyNote>
            </div>

            {/* Connector → */}
            <div className="flex items-center justify-center py-3 md:px-4 md:py-0 md:pt-10">
              <div className="md:hidden">
                <ConnectorLine mode="vertical" length={32} color="#BFBFBF" delay={i * 0.1 + 0.3} />
              </div>
              <div className="hidden md:block">
                <ConnectorLine mode="horizontal" length={48} color="#BFBFBF" delay={i * 0.1 + 0.3} />
              </div>
            </div>

            {/* Solution */}
            <div className="flex flex-col items-center md:items-start">
              <StickyNote color={project.solutionColor} rotate={1.5} delay={i * 0.1 + 0.2} className="w-full md:w-52">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Solution</p>
                <p className="text-xs leading-relaxed text-slate-700">{project.solution}</p>
              </StickyNote>
            </div>

            {/* Connector → */}
            <div className="flex items-center justify-center py-3 md:px-4 md:py-0 md:pt-10">
              <div className="md:hidden">
                <ConnectorLine mode="vertical" length={32} color="#BFBFBF" delay={i * 0.1 + 0.45} />
              </div>
              <div className="hidden md:block">
                <ConnectorLine mode="horizontal" length={48} color="#BFBFBF" delay={i * 0.1 + 0.45} />
              </div>
            </div>

            {/* Outcome */}
            <div className="flex flex-col items-center md:items-start">
              <StickyNote color={project.outcomeColor} rotate={-0.5} delay={i * 0.1 + 0.3} className="w-full md:w-52">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Outcome</p>
                <p className="text-xs leading-relaxed text-slate-700">{project.outcome}</p>
              </StickyNote>
            </div>

          </div>

          {/* Tags row */}
          <div className="flex flex-wrap gap-2 border-t border-dashed border-slate-200 pt-4">
            {project.tags.map((tag) => (
              <span key={tag} className="figjam-stamp">{tag}</span>
            ))}
          </div>

        </div>
      </FigJamFrame>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className="figjam-canvas">
      <div className="mx-auto max-w-6xl space-y-12 px-4 pb-36 pt-10">

      {/* Page header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="figjam-frame-label mb-2"
        >
          Work
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 24 }}
          className="text-3xl font-semibold text-slate-900"
        >
          Case Studies
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-sm text-slate-500"
          style={{ fontStyle: 'italic' }}
        >
          Each project is a frame. Each frame tells a story.
        </motion.p>
      </div>

      {/* Project cards */}
      <div className="space-y-14">
        {projects.map((project, i) => (
          <Link
            key={project.title}
            to={project.href}
            className="block outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-label={`View case study: ${project.title}`}
          >
            <ProjectCard project={project} i={i} />
          </Link>
        ))}
      </div>

      </div>
    </section>
  )
}
