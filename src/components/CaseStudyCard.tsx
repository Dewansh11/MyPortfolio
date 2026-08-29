import { useState } from 'react'
import { motion } from 'framer-motion'

export interface CaseStudy {
  title: string
  subtitle: string
  highlight: string
  quote: string
  description: string
  tags: string[]
  coverGradient: string
  screenshotSrc: string
  href?: string
}

function ArrowIcon({ hovered }: { hovered: boolean }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      animate={{ rotate: hovered ? 15 : 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{ flexShrink: 0 }}
    >
      <path
        d="M5.5 14.5L14.5 5.5M14.5 5.5H7.5M14.5 5.5V12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}

export default function CaseStudyCard({ study, i = 0 }: { study: CaseStudy; i?: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      animate={{ y: hovered ? -4 : 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.08)'
          : '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* ── Cover area ──────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          background: study.coverGradient,
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Quote */}
        <div
          style={{
            padding: '28px 32px 20px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 13,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.88)',
              fontStyle: 'italic',
              maxWidth: 520,
            }}
          >
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 28,
                lineHeight: 0.5,
                verticalAlign: 'sub',
                color: 'rgba(255,255,255,0.5)',
                marginRight: 4,
                display: 'inline-block',
                transform: 'translateY(6px)',
              }}
            >
              &ldquo;
            </span>
            {study.quote}
          </span>
        </div>

        {/* Screenshot */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            margin: '0 24px',
            borderRadius: '12px 12px 0 0',
            overflow: 'hidden',
            minHeight: 160,
          }}
        >
          <img
            src={study.screenshotSrc}
            alt={`${study.title} screenshot`}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
            }}
          />
          {/* Subtle top-fade so screenshot blends into gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 40,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.18), transparent)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* ── Card body ───────────────────────────────────────────────────────── */}
      <div style={{ padding: '24px 28px 28px' }}>

        {/* Title row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 6,
          }}
        >
          <h3
            style={{
              fontFamily: '"Unigeo 32", ui-sans-serif, system-ui, sans-serif',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: '#0F172A',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {study.title}
          </h3>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1.5px solid rgba(0,0,0,0.1)',
              color: '#64748B',
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            <ArrowIcon hovered={hovered} />
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: '"Roboto Mono", ui-monospace, monospace',
            fontSize: 11,
            fontWeight: 400,
            color: '#94A3B8',
            letterSpacing: '0.03em',
            margin: '0 0 10px',
          }}
        >
          {study.subtitle}
        </p>

        {/* Highlight line */}
        <p
          style={{
            fontFamily: '"Roboto Mono", ui-monospace, monospace',
            fontSize: 11,
            fontWeight: 500,
            color: '#D97706',
            letterSpacing: '0.01em',
            margin: '0 0 16px',
          }}
        >
          {study.highlight}
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: '"Unigeo 32", ui-sans-serif, system-ui, sans-serif',
            fontSize: 13.5,
            fontWeight: 400,
            color: '#475569',
            lineHeight: 1.7,
            margin: '0 0 20px',
          }}
        >
          {study.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {study.tags.map(tag => (
            <span key={tag} className="figjam-stamp">{tag}</span>
          ))}
        </div>

      </div>
    </motion.div>
  )
}
