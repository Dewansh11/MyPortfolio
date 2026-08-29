import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes } from 'react'

interface BrutalistButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
  > {
  /**
   * Tailwind bg-* class for the 3D shadow block.
   * Primary  → 'bg-blue-600'  (accent blue, default)
   * Secondary → 'bg-zinc-700' (neutral gray)
   */
  shadowColorClass?: string
  /**
   * Tailwind border-* class applied to BOTH the shadow layer and the top
   * pill so they share a consistent edge colour.
   * Primary  → 'border-black'  (default)
   * Secondary → 'border-zinc-700'
   */
  borderColorClass?: string
  /**
   * When true the outer wrapper becomes a block element and the button
   * fills 100% of its parent — use this inside a fixed-width container
   * to force equal widths across multiple buttons.
   */
  fullWidth?: boolean
  /** Holds the top pill flush with the shadow (e.g. active nav section). */
  pressed?: boolean
}

export default function BrutalistButton({
  children,
  shadowColorClass = 'bg-blue-600',
  borderColorClass = 'border-black',
  fullWidth = false,
  pressed = false,
  className = '',
  ...props
}: BrutalistButtonProps) {
  return (
    /**
     * inline-block by default (shrinks to content).
     * block when fullWidth so the button fills its fixed-width container.
     * Shadow overflows this wrapper's bounds intentionally.
     */
    <div className={`relative ${fullWidth ? 'block' : 'inline-block'}`}>

      {/* ── Shadow layer ──────────────────────────────────────────────────────
          Same bounding box as the button (absolute inset-0) but shifted
          exactly 6px right + 6px down via translate-x-1.5 translate-y-1.5.
          This creates the crisp hard-edged 3D base with no blur.
          pointer-events-none so only the top pill layer is interactive.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-full border-2 ${borderColorClass} ${shadowColorClass}`}
      />

      {/* ── Top pill layer ────────────────────────────────────────────────────
          Hover  → x:  3, y:  3  (pre-press: moves halfway into shadow)
          Tap    → x:  6, y:  6  (full press: flush with shadow = flat)
          Spring return gives a satisfying mechanical "click" rebound.
      ─────────────────────────────────────────────────────────────────────── */}
      <motion.button
        type="button"
        animate={{ x: pressed ? 6 : 0, y: pressed ? 6 : 0 }}
        whileHover={pressed ? undefined : { x: 3, y: 3 }}
        whileTap={{ x: 6, y: 6 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`relative z-10 cursor-pointer select-none rounded-full border-2 ${borderColorClass} bg-white font-mono font-bold tracking-wide${fullWidth ? ' w-full text-center' : ''} ${className}`}
        {...props}
      >
        {children}
      </motion.button>

    </div>
  )
}
