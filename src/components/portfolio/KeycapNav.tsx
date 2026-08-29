import { useState, useEffect, useCallback } from 'react'

// ── Key definitions ───────────────────────────────────────────────────────────
interface KeyDef {
  label:      string
  sectionId:  string
  title:      string
  colorClass: string
}

const KEYS: KeyDef[] = [
  {
    label:      'home',
    sectionId:  'hero',
    title:      'Home',
    colorClass: 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
  },
  {
    label:      'about',
    sectionId:  'about-bento',
    title:      'About',
    colorClass: 'bg-orange-500 text-white dark:bg-orange-600',
  },
  {
    label:      'exp',
    sectionId:  'experience',
    title:      'Experience',
    colorClass: 'bg-blue-600 text-white dark:bg-blue-500',
  },
]

const KEYCAP_SHELL =
  'relative flex h-14 w-14 flex-col items-center justify-center rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none cursor-pointer dark:border-black'

const KEYCAP_MOTION =
  'motion-safe:transition-all motion-reduce:transition-none duration-150 ease-out'

const KEYCAP_FOCUS =
  'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'

const KEYCAP_LABEL =
  'font-mono text-[10px] font-extrabold tracking-tight text-current lowercase'

const KEYCAP_PRESS =
  'translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'

const KEYCAP_INTERACT =
  'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'

// ── IntersectionObserver hook ─────────────────────────────────────────────────
function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35, rootMargin: '-15% 0px -15% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [ids])

  return active
}

// ── Single keycap ─────────────────────────────────────────────────────────────
interface KeycapProps {
  def:     KeyDef
  active:  boolean
  onPress: () => void
}

function Keycap({ def, active, onPress }: KeycapProps) {
  const [hovered, setHovered] = useState(false)
  const pressed = active || hovered

  return (
    <button
      type="button"
      aria-label={`Go to ${def.title} section`}
      aria-current={active ? 'true' : undefined}
      onClick={onPress}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={e => {
        if (e.currentTarget.matches(':focus-visible')) setHovered(true)
      }}
      onBlur={() => setHovered(false)}
      className={[
        KEYCAP_SHELL,
        KEYCAP_MOTION,
        KEYCAP_FOCUS,
        KEYCAP_LABEL,
        def.colorClass,
        pressed ? KEYCAP_PRESS : KEYCAP_INTERACT,
      ].join(' ')}
    >
      {def.label}
    </button>
  )
}

// ── Nav wrapper ───────────────────────────────────────────────────────────────
export default function KeycapNav() {
  const ids    = KEYS.map(k => k.sectionId)
  const active = useActiveSection(ids)

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <nav
      className="fixed right-8 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 pr-1 pb-1 md:flex"
      aria-label="Section navigation"
    >
      {KEYS.map(k => (
        <Keycap
          key={k.sectionId}
          def={k}
          active={active === k.sectionId}
          onPress={() => scrollTo(k.sectionId)}
        />
      ))}
    </nav>
  )
}
