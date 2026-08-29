import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Data ──────────────────────────────────────────────────────────────────────
const SKILLS = [
  'User Research',
  'UX Strategy',
  'Design Systems',
  'Accessibility Design',
  'Product Thinking',
  'Behavioral Design',
  'Rapid Prototyping',
  'vibe coding',
]

// ── Skill pill ────────────────────────────────────────────────────────────────
function SkillItem({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  const isVibe = label === 'vibe coding'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 28,
        padding: '0 20px',
        flexShrink: 0,
      }}
    >
      <motion.span
        style={{
          position: 'relative',
          display: 'inline-block',
          fontFamily: '"Unigeo 32", ui-sans-serif, system-ui, sans-serif',
          fontSize: 13,
          fontWeight: isVibe ? 700 : 500,
          letterSpacing: isVibe ? '-0.01em' : '0.01em',
          color: isVibe ? '#166534' : '#1a1a1a',
          whiteSpace: 'nowrap',
          fontStyle: isVibe ? 'italic' : 'normal',
        }}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
        {/* Minimal underline on hover */}
        <motion.span
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: 1,
            background: isVibe ? '#166534' : '#1a1a1a',
            transformOrigin: 'left',
          }}
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.span>

      {/* Minimal dot separator */}
      <span
        aria-hidden="true"
        style={{
          width: 3,
          height: 3,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.25)',
          flexShrink: 0,
          display: 'inline-block',
        }}
      />
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SkillsTicker() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const items = [...SKILLS, ...SKILLS]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginLeft: 'calc(-50vw + 50%)',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        padding: '6px 0',
      }}
    >
      {/* Section label */}
      <div
        style={{
          marginLeft: 'calc(50vw - 50% + 16px)',
          marginBottom: 12,
          fontFamily: '"Unigeo 32", ui-sans-serif, system-ui, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(26,26,26,0.35)',
        }}
      >
        Expertise
      </div>

      {/* Scrolling strip */}
      <div
        style={{
          transform: 'rotate(-0.6deg)',
          margin: '-4px -8px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background: '#D9F99D',
            padding: '13px 0',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <motion.div
            style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          >
            {items.map((label, i) => (
              <SkillItem key={`${label}-${i}`} label={label} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
