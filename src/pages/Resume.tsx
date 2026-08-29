import { motion } from 'framer-motion'
import StickyNote from '../components/figjam/StickyNote'
import FigJamFrame from '../components/figjam/FigJamFrame'
import ConnectorLine from '../components/figjam/ConnectorLine'
import type { StickyColor } from '../components/figjam/StickyNote'

interface Role {
  company: string
  title: string
  period: string
  highlights: string[]
  color: StickyColor
  rotate: number
}

const experience: Role[] = [
  {
    company: 'Company Name',
    title: 'Senior UX Designer',
    period: '2024 – Present',
    highlights: [
      'Led design for 3 flagship features shipped to 500k+ users.',
      'Established a cross-functional design review process.',
      'Mentored 2 junior designers.',
    ],
    color: 'purple',
    rotate: -1.5,
  },
  {
    company: 'Previous Company',
    title: 'UX Designer',
    period: '2022 – 2024',
    highlights: [
      'Redesigned core checkout flow — conversion up 22%.',
      'Built and maintained a component library in Figma.',
      'Ran 40+ user research sessions.',
    ],
    color: 'yellow',
    rotate: 1,
  },
  {
    company: 'Studio / Agency',
    title: 'Junior Product Designer',
    period: '2021 – 2022',
    highlights: [
      'Shipped 6 client projects across fintech and health verticals.',
      'Developed rapid prototyping workflow using Figma.',
    ],
    color: 'blue',
    rotate: -1,
  },
]

const education = [
  {
    institution: 'University Name',
    degree: 'B.Des — Interaction Design',
    year: '2021',
    color: 'green' as const,
    rotate: 1.5,
  },
  {
    institution: 'Online Course',
    degree: 'Google UX Design Certificate',
    year: '2022',
    color: 'pink' as const,
    rotate: -2,
  },
]

export default function Resume() {
  return (
    <section className="figjam-canvas">
      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-36 pt-10">

      {/* Page header */}
      <div>
        <motion.div
          className="figjam-frame-label mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Resume
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 24 }}
          className="text-3xl font-semibold text-slate-900"
        >
          Experience Timeline
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-sm text-slate-500"
          style={{ fontStyle: 'italic' }}
        >
          A connector chain of where I've been and what I've built.
        </motion.p>
      </div>

      {/* ── Experience — vertical connector timeline ────────────────────────── */}
      <div className="relative">
        {experience.map((role, i) => (
          <div key={role.company} className="flex flex-col items-center">

            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 26, delay: i * 0.1 }}
              className={`w-full max-w-lg ${i % 2 === 0 ? 'self-start' : 'self-end'}`}
            >
              <StickyNote color={role.color} rotate={role.rotate} delay={i * 0.1}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{role.period}</p>
                    <h3 className="mt-0.5 text-base font-semibold text-slate-900">{role.title}</h3>
                    <p className="text-sm font-medium text-slate-600">{role.company}</p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <span className="mt-0.5 text-slate-400">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </StickyNote>
            </motion.div>

            {/* Vertical connector between roles */}
            {i < experience.length - 1 && (
              <div className="my-2">
                <ConnectorLine mode="vertical" length={40} color="#BFBFBF" delay={i * 0.1 + 0.3} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Education frame ────────────────────────────────────────────────── */}
      <FigJamFrame label="Education" delay={0.1}>
        <div className="flex flex-wrap gap-4">
          {education.map((edu, i) => (
            <StickyNote key={edu.institution} color={edu.color} rotate={edu.rotate} delay={i * 0.1}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{edu.year}</p>
              <p className="mt-1 text-sm font-bold text-slate-900">{edu.degree}</p>
              <p className="mt-0.5 text-xs text-slate-600">{edu.institution}</p>
            </StickyNote>
          ))}
        </div>
      </FigJamFrame>

      {/* ── Download stamp ─────────────────────────────────────────────────── */}
      <div className="flex justify-center pb-8">
        <motion.div
          initial={{ opacity: 0, rotate: -6, scale: 0.85 }}
          whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.08, rotate: -4 }}
          className="flex cursor-pointer flex-col items-center justify-center"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-32 w-32 flex-col items-center justify-center rounded-full border-[3px] border-dashed text-center text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #9B7AF7)',
              borderColor: '#6D28D9',
            }}
          >
            <span className="text-2xl">⬇</span>
            <span className="mt-1 text-[11px] font-bold uppercase tracking-widest leading-tight">
              Download<br />CV
            </span>
          </a>
          <p className="mt-3 text-xs text-slate-400" style={{ fontStyle: 'italic' }}>
            PDF · Updated 2026
          </p>
        </motion.div>
      </div>

      </div>
    </section>
  )
}
