import { motion, type Variants } from 'framer-motion'

// ── Data ──────────────────────────────────────────────────────────────────────
interface Step {
  number: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Understanding the Foundation',
    description:
      'I begin by collaborating with stakeholders and digging into the project goals. I focus on asking the right structural questions until I fully understand the business objectives and user needs.',
  },
  {
    number: '02',
    title: 'Mapping the Architecture',
    description:
      'Before drafting visual layouts, I map out the informational structure and user flows. This structural step allows me to identify navigation gaps and logic errors early in the process.',
  },
  {
    number: '03',
    title: 'Designing the Interface',
    description:
      'This is where ideas take shape. I rapidly explore layouts, visual concepts, and typography paths, balancing clean aesthetics with intuitive layouts that feel effortless to navigate.',
  },
  {
    number: '04',
    title: 'Structuring Scalable Systems',
    description:
      'I design comprehensive component libraries and styling systems rather than isolated pages. This ensures complete visual consistency and a seamless, organized handoff for developers.',
  },
  {
    number: '05',
    title: 'Auditing with AI Tools',
    description:
      'I use Claude and Cursor to accelerate layout engineering and system builds, then leverage Gemini and Perplexity to stress-test my interfaces, locate rare edge cases, and verify accessibility rules.',
  },
]

// ── Variants ──────────────────────────────────────────────────────────────────
// badgeVariants are driven by the parent article's whileHover="hover" state.
// Framer Motion propagates the variant name down to any child with a matching key.
const badgeVariants: Variants = {
  rest:  { backgroundColor: '#18181b', scale: 1   },  // zinc-900
  hover: { backgroundColor: '#2563EB', scale: 1.1 },  // blue-600
}

const badgeTransition = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
}

// ── Step card ─────────────────────────────────────────────────────────────────
function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    /**
     * Outer motion.div: handles the scroll-reveal entrance only.
     * Keeping entrance separate from hover avoids conflicts between
     * object-based initial/whileInView and string-based variant names.
     */
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/**
       * Inner motion.article: the variant anchor.
       * initial="rest" / animate="rest" establishes the base state so
       * children with variants know where to return after hover ends.
       * whileHover="hover" propagates "hover" to all variant-aware children.
       * CSS transition-colors handles the border highlight independently.
       */}
      <motion.article
        initial="rest"
        animate="rest"
        whileHover="hover"
        className="rounded-2xl border-2 border-zinc-200 bg-white p-7 transition-colors duration-200 hover:border-blue-600"
      >
        <div className="flex items-start gap-4">

          {/* ── Step badge ────────────────────────────────────────────────────
              Dark square badge. Variant propagation from parent switches it
              to accent blue and scales it up when the card is hovered.
          ──────────────────────────────────────────────────────────────────── */}
          <motion.div
            variants={badgeVariants}
            transition={badgeTransition}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
          >
            <span className="font-mono text-sm font-bold text-white">
              {step.number}
            </span>
          </motion.div>

          {/* ── Step content ──────────────────────────────────────────────── */}
          <div className="min-w-0 pt-1">
            <h3 className="text-base font-semibold tracking-tight text-zinc-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {step.description}
            </p>
          </div>

        </div>
      </motion.article>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function MyProcess() {
  return (
    <section className="relative w-full px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-start">

          {/* ── Left column — sticky editorial anchor ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 md:sticky md:top-32"
          >
            {/* Tiny orange square + section tag */}
            <div className="mb-6 flex items-center gap-3">
              <span className="block h-3 w-3 flex-shrink-0 rounded-sm bg-orange-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                My Process
              </span>
            </div>

            {/* Bold editorial headline */}
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-zinc-900 lg:text-4xl">
              From the first confusing call to the final handoff.
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-zinc-500">
              Five principles I follow on every engagement — regardless of the
              brief, the stack, or the timeline.
            </p>
          </motion.div>

          {/* ── Right column — scrolling step cards ───────────────────────── */}
          <div className="space-y-4 md:col-span-8">
            {STEPS.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
