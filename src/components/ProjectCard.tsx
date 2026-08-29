import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export interface ProjectCardData {
  title: string
  subtitle: string
  description: string
  tags: string[]
  /** Gradient / solid cover — omit when using coverImage */
  coverClass?: string
  /** Product screenshot hero — cropped via object-cover object-top */
  coverImage?: string
  coverImageAlt?: string
  /** Internal route or external URL for the case study */
  href?: string
}

interface ProjectCardProps extends ProjectCardData {
  index?: number
  /** Disables entry/hover shift when used inside scroll stack */
  stacked?: boolean
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  tags,
  coverClass = 'bg-zinc-900',
  coverImage,
  coverImageAlt,
  href,
  index = 0,
  stacked = false,
}: ProjectCardProps) {
  const card = (
    <motion.article
      initial={stacked ? false : { opacity: 0, y: 24 }}
      whileInView={stacked ? undefined : { opacity: 1, y: 0 }}
      viewport={stacked ? undefined : { once: true, margin: '-60px' }}
      transition={
        stacked
          ? undefined
          : {
              delay: index * 0.1,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      whileHover={
        stacked
          ? undefined
          : {
              x: 6,
              y: 6,
              transition: { type: 'spring', stiffness: 400, damping: 25 },
            }
      }
      className={`group relative z-10 flex min-h-[320px] flex-col overflow-hidden rounded-2xl border-2 border-black bg-[#fcfbfa] md:flex-row${
        href ? ' cursor-pointer' : ''
      }`}
    >
      {/* Left — copy */}
      <div className="flex flex-1 flex-col gap-5 p-6 md:w-[58%] md:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border-2 border-black bg-black px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-white">
            {subtitle}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold leading-tight tracking-tight text-zinc-900 lg:text-3xl">
            {title}
          </h3>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-all duration-200 group-hover:border-zinc-900 group-hover:text-zinc-900">
            <ArrowUpRight />
          </span>
        </div>

        <p className="text-sm leading-relaxed text-zinc-500 md:text-base">{description}</p>

        <div className="mt-auto flex flex-wrap gap-2 border-t border-zinc-200 pt-4">
          {tags.map(tag => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right — visual */}
      <div className="relative min-h-[220px] w-full overflow-hidden bg-yellow-400 md:w-[42%] md:min-h-0">
        {coverImage ? (
          <img
            src={coverImage}
            alt={coverImageAlt ?? `${title} product screenshot`}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            className={`h-full min-h-[220px] w-full transition-transform duration-500 group-hover:scale-[1.02] md:min-h-full ${coverClass}`}
          />
        )}
      </div>
    </motion.article>
  )

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border-2 border-black bg-blue-600"
      />

      {href ? (
        <Link
          to={href}
          className="relative z-10 block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          aria-label={`View case study: ${title}`}
        >
          {card}
        </Link>
      ) : (
        card
      )}
    </div>
  )
}
