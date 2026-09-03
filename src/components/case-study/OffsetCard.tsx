import type { ReactNode } from 'react'

interface OffsetCardProps {
  children: ReactNode
  className?: string
  /** Classes on the inner face (padding, fill). */
  innerClassName?: string
  /** Offset layer fill — blue on cream cards, black on blue faces. */
  shadowClassName?: string
}

/** Same chrome as home ProjectCard: 2px black border, rounded-2xl, hard blue offset. */
export default function OffsetCard({
  children,
  className = '',
  innerClassName = 'bg-[#fcfbfa]',
  shadowClassName = 'bg-blue-600',
}: OffsetCardProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border-2 border-black ${shadowClassName}`}
      />
      <div className={`relative z-10 h-full overflow-hidden rounded-2xl border-2 border-black ${innerClassName}`}>
        {children}
      </div>
    </div>
  )
}
