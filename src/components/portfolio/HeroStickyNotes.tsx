import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

const DRAG_SPRING = { bounceStiffness: 520, bounceDamping: 18 }
const SHADOW_OFFSET = 5

function SelectionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="30" height="30" stroke="currentColor" strokeWidth="2" />
      <rect x="5" y="5" width="7" height="7" fill="currentColor" />
      <rect x="28" y="5" width="7" height="7" fill="currentColor" />
      <rect x="5" y="28" width="7" height="7" fill="currentColor" />
      <rect x="28" y="28" width="7" height="7" fill="currentColor" />
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="20" cy="17" r="2" fill="currentColor" />
      <circle cx="20" cy="23" r="2" fill="currentColor" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 4 L23 17 L36 20 L23 23 L20 36 L17 23 L4 20 L17 17 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="4" fill="currentColor" />
    </svg>
  )
}

interface PopCardProps extends HTMLMotionProps<'div'> {
  faceClass:  string
  shellClass?: string
  children:   ReactNode
}

function PopCard({ faceClass, shellClass = '', children, className = '', style, ...motionProps }: PopCardProps) {
  return (
    <motion.div
      {...motionProps}
      className={`relative cursor-grab active:cursor-grabbing select-none ${shellClass} ${className}`}
      style={{
        marginRight: SHADOW_OFFSET,
        marginBottom: SHADOW_OFFSET,
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl border-2 border-black bg-black"
        style={{ transform: `translate(${SHADOW_OFFSET}px, ${SHADOW_OFFSET}px)` }}
      />

      <div
        className={`relative z-10 flex flex-col gap-3 rounded-2xl border-2 border-black p-3.5 ${faceClass}`}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default function HeroStickyNotes() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden overflow-visible lg:block">
      {/* Left whitespace */}
      <div
        className="hero-sticky-layer pointer-events-auto absolute inset-y-0 left-0 w-[min(42%,340px)]"
      >
        <PopCard
          shellClass="w-44 rotate-3"
          faceClass="bg-orange-500 text-black"
          drag
          dragMomentum={false}
          dragConstraints={{ left: -50, right: 200, top: -50, bottom: 200 }}
          dragElastic={0.18}
          dragTransition={DRAG_SPRING}
          whileDrag={{ scale: 1.02, zIndex: 30 }}
          className="absolute top-1/4 left-12"
        >
          <div className="flex items-center gap-2">
            <SelectionIcon />
            <span className="text-xl font-semibold tracking-tight">Now</span>
          </div>

          <div className="inline-flex items-center gap-1.5 self-center rounded-full border-2 border-black bg-white px-3 py-1.5 font-mono text-xs font-bold tracking-tight text-black">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Goldenflitch
          </div>

          <p className="text-center font-mono text-xs font-bold text-white">
            Currently at studio.
          </p>
        </PopCard>
      </div>

      {/* Right card — anchored past max-w-3xl text column, clear of KeycapNav */}
      <div className="hero-sticky-layer pointer-events-auto absolute inset-y-0 right-0">
        <PopCard
          shellClass="w-48 rotate-2"
          faceClass="bg-blue-600 text-white"
          drag
          dragMomentum={false}
          dragConstraints={{ left: -120, right: 40, top: -80, bottom: 160 }}
          dragElastic={0.18}
          dragTransition={DRAG_SPRING}
          whileDrag={{ scale: 1.02, zIndex: 30 }}
          className="absolute top-[26%] right-[max(5.5rem,calc(50vw-39rem))]"
        >
          <div className="flex items-center gap-2 text-white">
            <SparkIcon />
            <span className="text-xl font-semibold tracking-tight">Into</span>
          </div>

          <div className="self-center rounded-full border-2 border-black bg-white px-3.5 py-1.5 font-mono text-xs font-bold tracking-tight text-black">
            vibe coding
          </div>

          <p className="text-center font-mono text-xs font-bold text-white">
            Fascinated by spatial interfaces.
          </p>
        </PopCard>
      </div>
    </div>
  )
}
