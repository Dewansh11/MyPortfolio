interface ImagePlaceholderProps {
  label: string
  ariaLabel: string
  className?: string
}

export default function ImagePlaceholder({ label, ariaLabel, className = '' }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`flex items-center justify-center border-2 border-black bg-zinc-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}
    >
      <span className="px-4 text-center font-mono text-xs font-bold uppercase tracking-widest text-zinc-600">
        {label}
      </span>
    </div>
  )
}
