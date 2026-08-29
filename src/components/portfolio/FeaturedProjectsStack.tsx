import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ProjectCard, { type ProjectCardData } from '../ProjectCard'

const STICKY_TOP = 112
const STICKY_STEP = 36
const STACK_GAP = 140

interface StackingCardProps {
  project: ProjectCardData
  index: number
  total: number
}

function StackingCard({ project, index, total }: StackingCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 1, 0.9 - index * 0.015])
  const rotateX = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0, 14 + index * 2])
  const y = useTransform(scrollYProgress, [0, 1], [0, -18])
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.92])
  const filter = useTransform(brightness, v => `brightness(${v})`)

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        position: 'sticky',
        top: STICKY_TOP + index * STICKY_STEP,
        zIndex: index + 1,
        marginBottom: index < total - 1 ? STACK_GAP : 0,
      }}
    >
      <motion.div
        style={{
          scale,
          rotateX,
          y,
          filter,
          transformOrigin: 'top center',
          transformPerspective: 1200,
        }}
        className="will-change-transform"
      >
        <ProjectCard {...project} index={index} stacked />
      </motion.div>
    </div>
  )
}

interface FeaturedProjectsStackProps {
  projects: ProjectCardData[]
}

export default function FeaturedProjectsStack({ projects }: FeaturedProjectsStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        perspective: '1200px',
        paddingBottom: `${Math.max(projects.length * 48, 120)}px`,
      }}
    >
      {projects.map((project, i) => (
        <StackingCard
          key={project.title}
          project={project}
          index={i}
          total={projects.length}
        />
      ))}
    </div>
  )
}
