import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export type StickyColor = 'yellow' | 'purple' | 'green' | 'pink' | 'blue'

// Each color has a subtle gradient: slightly lighter at top, slightly darker at bottom
const colorMap: Record<StickyColor, { top: string; bottom: string }> = {
  yellow: { top: '#F5D060', bottom: '#D4A030' },
  purple: { top: '#D4C8F8', bottom: '#B5A4F0' },
  green:  { top: '#8DE4AD', bottom: '#60C485' },
  pink:   { top: '#F9A8C4', bottom: '#F07299' },
  blue:   { top: '#9DD8FD', bottom: '#65BCFA' },
}

// Subtle SVG fractal-noise grain as a data-URI overlay
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`

// Organic border-radius: slightly different on each corner for a hand-cut feel
const ORGANIC_RADIUS = '5% 6% 7% 5% / 6% 5% 6% 7%'

interface StickyNoteProps {
  color?: StickyColor
  rotate?: number
  draggable?: boolean
  className?: string
  children: ReactNode
  delay?: number
}

export default function StickyNote({
  color = 'yellow',
  rotate = 0,
  draggable = false,
  className = '',
  children,
  delay = 0,
}: StickyNoteProps) {
  const { top, bottom } = colorMap[color]

  // Rest shadow: large diffused outer + tight inner depth layer
  const shadowRest =
    '0 1px 2px rgba(0,0,0,0.10), 0 6px 18px rgba(0,0,0,0.11), 0 18px 40px rgba(0,0,0,0.07)'

  // Hover shadow: lift the note higher with more spread
  const shadowHover =
    '0 2px 4px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.16), 0 32px 56px rgba(0,0,0,0.10)'

  return (
    <motion.div
      drag={draggable}
      dragMomentum={false}
      initial={{ opacity: 0, y: 24, rotate }}
      animate={{ opacity: 1, y: -5, rotate }}
      transition={{ type: 'spring', stiffness: 240, damping: 22, delay }}
      whileHover={{
        y: -12,
        rotate: rotate * 0.5,
        boxShadow: shadowHover,
        transition: { type: 'spring', stiffness: 320, damping: 22 },
        zIndex: 20,
      }}
      whileDrag={{ scale: 1.04, zIndex: 30, cursor: 'grabbing' }}
      style={{
        background: `linear-gradient(175deg, ${top} 0%, ${bottom} 100%)`,
        boxShadow: shadowRest,
        borderRadius: ORGANIC_RADIUS,
        rotate,
        position: 'relative',
        overflow: 'hidden',
      }}
      className={`p-4 ${draggable ? 'cursor-grab' : ''} ${className}`}
    >
      {/* Paper grain texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          backgroundImage: GRAIN_SVG,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 150px',
          opacity: 0.045,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Folded corner — top-right crease for realism */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 16px 16px 0',
          borderColor: `transparent rgba(0,0,0,0.09) transparent transparent`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content sits above overlays */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        {children}
      </div>
    </motion.div>
  )
}
