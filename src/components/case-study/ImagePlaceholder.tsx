import OffsetCard from './OffsetCard'

interface ImagePlaceholderProps {
  label: string
  ariaLabel: string
  className?: string
}

export default function ImagePlaceholder({ label, ariaLabel, className = '' }: ImagePlaceholderProps) {
  return (
    <OffsetCard>
      <div
        role="img"
        aria-label={ariaLabel}
        className={`flex items-center justify-center bg-zinc-100 ${className}`}
      >
        <span className="px-4 text-center text-xs font-medium uppercase tracking-widest text-zinc-500">
          {label}
        </span>
      </div>
    </OffsetCard>
  )
}
