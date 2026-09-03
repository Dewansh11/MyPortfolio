interface CaseStudySectionLabelProps {
  /** e.g. "01" */
  number: string
  /** e.g. "The Problem" — rendered uppercase */
  title: string
}

/**
 * Matches the site's section-label pattern (orange square + mono uppercase).
 * Uses a real heading element for document outline / screen readers.
 */
export default function CaseStudySectionLabel({ number, title }: CaseStudySectionLabelProps) {
  return (
    <h2 className="mb-10 flex items-center gap-3">
      <span className="block h-3 w-3 shrink-0 rounded-sm bg-orange-500" aria-hidden="true" />
      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {number} {title}
      </span>
    </h2>
  )
}
