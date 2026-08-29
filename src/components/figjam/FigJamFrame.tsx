import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FigJamFrameProps {
  label: string
  children: ReactNode
  className?: string
  delay?: number
  accentColor?: string
}

export default function FigJamFrame({
  label,
  children,
  className = '',
  delay = 0,
  accentColor = '#BFBFBF',
}: FigJamFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 28, delay }}
      className={`relative ${className}`}
    >
      {/* Frame label — floats above the top-left border exactly like FigJam */}
      <div
        className="absolute -top-7 left-0 flex items-center gap-1.5"
        style={{ color: accentColor }}
      >
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: '#1a1a1a', opacity: 0.5 }}
        >
          {label}
        </span>
      </div>

      {/* Frame border */}
      <motion.div
        whileHover={{ borderColor: '#7C3AED' }}
        transition={{ duration: 0.2 }}
        className="rounded-[8px] p-6"
        style={{
          border: `2px solid ${accentColor}`,
          background: 'rgba(255,255,255,0.6)',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
