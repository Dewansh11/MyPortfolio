interface CaseStudySectionLabelProps {
  /** e.g. "01" */
  number: string
  /** e.g. "The Problem" — rendered uppercase */
  title: string
}

/** Bordered chip matching Key Decisions / problem-diagram numbered badges. */
const KEY_DECISION_NUMBER_CHIP =
  'shrink-0 rounded-full border-2 border-black bg-[#fcfbfa] px-2.5 py-1 text-[10px] font-bold text-orange-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'

const SECTION_TITLE_LABEL =
  'font-sans text-xs font-semibold uppercase tracking-widest text-zinc-400'

/**
 * Section eyebrow: numbered chip + uppercase label.
 * Uses body font so numerals render cleanly (display face can show broken glyphs).
 */
export default function CaseStudySectionLabel({ number, title }: CaseStudySectionLabelProps) {
  return (
    <h2 className="mb-10 flex items-center gap-3 font-sans">
      <span className={KEY_DECISION_NUMBER_CHIP}>{number}</span>
      <span className={SECTION_TITLE_LABEL}>{title}</span>
    </h2>
  )
}
