import { motion } from 'framer-motion'
import StickyNote from '../components/figjam/StickyNote'
import FigJamFrame from '../components/figjam/FigJamFrame'
import ConnectorLine from '../components/figjam/ConnectorLine'
const skills = [
  { label: 'UX Research', color: 'purple' as const, rotate: -2 },
  { label: 'Interaction Design', color: 'yellow' as const, rotate: 1.5 },
  { label: 'Figma', color: 'green' as const, rotate: -1 },
  { label: 'Prototyping', color: 'blue' as const, rotate: 2 },
  { label: 'Design Systems', color: 'pink' as const, rotate: -1.5 },
  { label: 'Usability Testing', color: 'yellow' as const, rotate: 1 },
  { label: 'Information Architecture', color: 'purple' as const, rotate: -2.5 },
  { label: 'Product Strategy', color: 'green' as const, rotate: 1.5 },
]

const process = [
  { step: '01', emoji: '🔍', label: 'Research', description: 'Talk to users. Read behaviour data. Form hypotheses.' },
  { step: '02', emoji: '🎯', label: 'Define', description: 'Synthesise findings. Reframe the problem. Set success metrics.' },
  { step: '03', emoji: '✏️', label: 'Design', description: 'Sketch fast. Prototype faster. Get it in front of people.' },
  { step: '04', emoji: '🚀', label: 'Ship', description: 'Launch. Measure. Iterate. The work is never done.' },
]

const funFacts = [
  { text: 'I sketch wireframes on paper first, always.', color: 'yellow' as const, rotate: -2 },
  { text: 'I believe clarity is a form of kindness.', color: 'pink' as const, rotate: 1.5 },
  { text: 'Coffee-to-insight ratio: very high.', color: 'green' as const, rotate: -1 },
]

export default function About() {
  return (
    <section className="figjam-canvas">
      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-36 pt-10">

      {/* Page header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="figjam-frame-label mb-2"
        >
          About Me
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 24 }}
          className="text-3xl font-semibold text-slate-900"
        >
          The person behind the work
        </motion.h1>
      </div>

      {/* ── Bio sticky ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <StickyNote color="yellow" rotate={1} delay={0.1} draggable className="flex-1 md:max-w-lg">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">↳ in my own words</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-800">
            I'm a UX Designer who obsesses over the space between a user's intent and a product's response.
            I've worked across early-stage startups and scaled products — and I think the best design
            is the kind users don't notice, because it just <em>works</em>.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-800">
            I bring a research-first mindset to everything I design. Not because it's good practice —
            but because I'm genuinely curious about people.
          </p>
        </StickyNote>

        <div className="flex flex-col gap-4">
          <StickyNote color="blue" rotate={-1.5} delay={0.2}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Based in</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">Your City, Country 📍</p>
          </StickyNote>
          <StickyNote color="purple" rotate={2} delay={0.3}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Experience</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">3+ Years in UX</p>
          </StickyNote>
        </div>
      </div>

      {/* ── Process flow ───────────────────────────────────────────────────── */}
      <FigJamFrame label="How I Work">
        <div className="flex flex-col gap-0 md:flex-row md:items-start">
          {process.map((step, i) => (
            <div key={step.step} className="flex flex-col items-center md:flex-row">
              <div className="flex flex-col items-center">
                <StickyNote
                  color={(['purple', 'yellow', 'green', 'pink'] as const)[i]}
                  rotate={([-1.5, 2, -2, 1.5])[i]}
                  delay={i * 0.12}
                  className="w-full text-center md:w-40"
                >
                  <div className="text-2xl">{step.emoji}</div>
                  <p className="mt-1 text-xs font-bold text-slate-800">{step.label}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{step.description}</p>
                </StickyNote>
              </div>

              {/* Connector between steps */}
              {i < process.length - 1 && (
                <div className="flex items-center justify-center py-3 md:px-3 md:py-0 md:pt-8">
                  <div className="md:hidden">
                    <ConnectorLine mode="vertical" length={24} color="#BFBFBF" delay={i * 0.12 + 0.3} />
                  </div>
                  <div className="hidden md:block">
                    <ConnectorLine mode="horizontal" length={36} color="#BFBFBF" delay={i * 0.12 + 0.3} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </FigJamFrame>

      {/* ── Skills cluster ─────────────────────────────────────────────────── */}
      <FigJamFrame label="Tools & Skills" delay={0.1}>
        <div className="flex flex-wrap gap-4">
          {skills.map((skill, i) => (
            <StickyNote
              key={skill.label}
              color={skill.color}
              rotate={skill.rotate}
              delay={i * 0.07}
              className="shrink-0"
            >
              <span className="text-sm font-semibold text-slate-800">{skill.label}</span>
            </StickyNote>
          ))}
        </div>
      </FigJamFrame>

      {/* ── Fun facts cluster ──────────────────────────────────────────────── */}
      <div>
        <motion.div
          className="figjam-frame-label mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          A few things about me
        </motion.div>
        <div className="flex flex-wrap gap-4">
          {funFacts.map((fact, i) => (
            <StickyNote
              key={i}
              color={fact.color}
              rotate={fact.rotate}
              delay={i * 0.1}
              draggable
              className="max-w-[220px]"
            >
              <p className="text-sm leading-relaxed text-slate-800">{fact.text}</p>
            </StickyNote>
          ))}
        </div>
      </div>

      </div>
    </section>
  )
}
