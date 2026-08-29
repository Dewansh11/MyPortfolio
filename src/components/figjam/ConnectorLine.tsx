import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type ConnectorMode = 'horizontal' | 'vertical' | 'elbow-right' | 'elbow-down'

interface ConnectorLineProps {
  mode?: ConnectorMode
  length?: number
  color?: string
  delay?: number
  strokeWidth?: number
  showArrow?: boolean
  className?: string
}

function buildPath(mode: ConnectorMode, length: number): { d: string; width: number; height: number } {
  switch (mode) {
    case 'horizontal':
      return { d: `M 0 4 H ${length}`, width: length, height: 8 }
    case 'vertical':
      return { d: `M 4 0 V ${length}`, width: 8, height: length }
    case 'elbow-right':
      // Goes right then down
      return {
        d: `M 0 4 H ${length / 2} V ${length * 0.6} H ${length}`,
        width: length,
        height: length * 0.6 + 8,
      }
    case 'elbow-down':
      // Goes down then right
      return {
        d: `M 4 0 V ${length / 2} H ${length * 0.8} V ${length}`,
        width: length * 0.8 + 8,
        height: length,
      }
  }
}

export default function ConnectorLine({
  mode = 'horizontal',
  length = 80,
  color = '#BFBFBF',
  delay = 0,
  strokeWidth = 2,
  showArrow = true,
  className = '',
}: ConnectorLineProps) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const { d, width, height } = buildPath(mode, length)

  // Total path length approximation — animate stroke-dashoffset from full → 0
  const estimatedLength = length * 1.5

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      {showArrow && (
        <defs>
          <marker
            id={`arrow-${mode}-${delay}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill={color} />
          </marker>
        </defs>
      )}

      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={showArrow ? `url(#arrow-${mode}-${delay})` : undefined}
        strokeDasharray={estimatedLength}
        initial={{ strokeDashoffset: estimatedLength }}
        animate={isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: estimatedLength }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay }}
      />
    </svg>
  )
}
