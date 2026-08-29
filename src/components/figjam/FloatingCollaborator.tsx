import { motion } from 'framer-motion'

interface FloatingCollaboratorProps {
  name: string
  color: string
  /** Fixed position on viewport */
  position: { left?: string; right?: string; top?: string; bottom?: string }
  /** Pixel offsets to drift through — repeats infinitely */
  floatX?: number[]
  floatY?: number[]
  duration?: number
  delay?: number
}

export default function FloatingCollaborator({
  name,
  color,
  position,
  floatX = [0, 18, -12, 24, 0],
  floatY = [0, -20, 14, -10, 0],
  duration = 8,
  delay = 0,
}: FloatingCollaboratorProps) {
  return (
    <motion.div
      className="pointer-events-none fixed z-[9998] flex select-none items-start"
      style={position}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: floatX,
        y: floatY,
      }}
      transition={{
        opacity: { delay: delay + 1.4, duration: 0.55 },
        x: { duration, repeat: Infinity, ease: 'easeInOut', delay },
        y: { duration: duration * 0.9, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.4 },
      }}
    >
      {/* Colored arrow — no stroke, matches badge color exactly */}
      <svg width="14" height="16" viewBox="0 0 26 30" fill="none" style={{ display: 'block', flexShrink: 0 }}>
        <path
          d="M3 2L3 25L9 19L13.5 28.5L17.5 26.5L13 17L22 17L3 2Z"
          fill={color}
        />
      </svg>

      {/* Compact rounded badge */}
      <div
        style={{
          marginTop: '8px',
          marginLeft: '-1px',
          background: color,
          borderRadius: '4px',
          padding: '4px 10px',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 500,
          fontFamily: '"Unigeo 32", ui-sans-serif, system-ui, sans-serif',
          whiteSpace: 'nowrap',
          lineHeight: 1.4,
        }}
      >
        {name}
      </div>
    </motion.div>
  )
}
