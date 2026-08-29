import { motion } from 'framer-motion'

function LayoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="rgba(26,24,20,0.55)" strokeWidth="1.6" />
      <rect x="10" y="1" width="7" height="7" rx="1.5" stroke="rgba(26,24,20,0.55)" strokeWidth="1.6" />
      <rect x="1" y="10" width="7" height="7" rx="1.5" stroke="rgba(26,24,20,0.55)" strokeWidth="1.6" />
      <rect x="10" y="10" width="7" height="7" rx="1.5" stroke="rgba(26,24,20,0.55)" strokeWidth="1.6" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M 2 3.5 L 5 6.5 L 8 3.5" stroke="rgba(26,24,20,0.40)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const DIVIDER = (
  <div
    className="mx-2 w-px shrink-0"
    style={{ height: '26px', background: 'rgba(0,0,0,0.06)' }}
  />
)

export default function FloatingToolbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 24 }}
      className="fixed top-4 right-4 z-50 flex items-center rounded-[20px] border border-black/[0.05] px-3 py-2"
      style={{
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow:
          '0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)',
      }}
    >
      {/* ── Avatar + chevron ── */}
      <button
        className="flex items-center gap-1 rounded-[12px] px-2 py-1.5 transition-all duration-200 hover:bg-black/[0.04]"
        aria-label="Profile menu"
      >
        <div className="h-6 w-6 overflow-hidden rounded-full">
          <img
            src="/dewansh.png"
            alt="Dewansh Saxena"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 20%' }}
          />
        </div>
        <ChevronDown />
      </button>

      {DIVIDER}

      {/* ── Layout toggle ── */}
      <button
        className="flex h-8 w-8 items-center justify-center rounded-[12px] transition-all duration-200 hover:bg-black/[0.04]"
        aria-label="Change layout"
      >
        <LayoutIcon />
      </button>

      {DIVIDER}

      {/* ── Music player ── */}
      <button
        className="flex items-center gap-1.5 rounded-[12px] px-3 py-1.5 transition-all duration-200 hover:bg-black/[0.04]"
        aria-label="Now playing"
      >
        <span className="relative flex items-center leading-none">
          <span className="text-[16px]">🎵</span>
          <span className="absolute -right-1 -top-1 text-[9px]">⭐</span>
        </span>
        <span
          className="font-mono text-sm font-semibold tracking-wide"
          style={{ color: 'rgba(26,24,20,0.70)', minWidth: '36px' }}
        >
          03:00
        </span>
      </button>

      {DIVIDER}

      {/* ── Share button ── */}
      <button
        className="rounded-[6px] px-5 py-[7px] text-sm text-white transition-opacity hover:opacity-90"
        style={{
          backgroundColor: 'rgba(124, 58, 237, 1)',
          fontFamily: '"Roboto Mono"',
          fontWeight: 400,
          backgroundClip: 'unset',
          WebkitBackgroundClip: 'unset',
        }}
        aria-label="Share"
      >
        Share
      </button>
    </motion.div>
  )
}
