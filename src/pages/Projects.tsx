import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import SectionBackdrop from '../components/portfolio/SectionBackdrop'
import { FEATURED_PROJECTS } from '../data/featuredProjects'

export default function Projects() {
  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#f6f8fa]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <SectionBackdrop />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-28 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="block h-3 w-3 shrink-0 rounded-sm bg-orange-500" aria-hidden="true" />
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Work
            </p>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 lg:text-4xl">
            Case Studies
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500">
            Each project is a frame. Each frame tells a story.
          </p>
        </motion.div>

        <div className="flex flex-col gap-10">
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
