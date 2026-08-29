import { useState } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────

interface ExperienceRow {
  index: string
  label: string
  date: string
}

const EXPERIENCE: ExperienceRow[] = [
  {
    index: '01',
    label: 'Goldenflitch — User Experience Designer',
    date: 'Jul 2025 - Present',
  },
  {
    index: '02',
    label: 'Spring 360 Technology — UX Designer',
    date: 'Sep 2024 - Mar 2025',
  },
  {
    index: '03',
    label: 'Digital Impact Square, TCS Foundation — Design Innovator',
    date: 'Feb 2024 - May 2024',
  },
  {
    index: '04',
    label: 'Mind Mark — UX Design Intern',
    date: 'Aug 2023 - Oct 2023',
  },
  {
    index: '05',
    label: 'Uplers — Graphic & UI Designer',
    date: 'Oct 2021 - Jun 2022',
  },
  {
    index: '06',
    label: 'Codejudge Inc. — Graphic Designer',
    date: 'Aug 2021 - Sep 2021',
  },
  {
    index: '07',
    label: 'SIMMI Foundation — Graphic Designer',
    date: 'Jan 2021 - Mar 2021',
  },
]

/** Placeholder highlights — replace with real copy per role */
const HIGHLIGHTS: Record<string, string[]> = {
  '01': [
    'Led redesign of core product flows, reducing task completion time by 28%.',
    'Built and maintained Figma component library used across 4 client projects.',
    'Ran weekly design critiques and mentored junior designers on research methods.',
  ],
  '02': [
    'Redesigned onboarding flow, improving activation rate by 22%.',
    'Conducted 15+ user interviews to validate navigation architecture.',
    'Shipped responsive UI kit aligned with engineering handoff standards.',
  ],
  '03': [
    'Prototyped civic-tech MVP addressing local healthcare access gaps.',
    'Applied design thinking workshops with cross-functional innovator teams.',
    'Presented solution pitch to TCS mentors and domain experts.',
  ],
  '04': [
    'Designed marketing landing pages for B2B SaaS campaigns.',
    'Created wireframes and hi-fi mocks for partner referral portal.',
    'Collaborated with copywriters on conversion-focused UX writing.',
  ],
  '05': [
    'Delivered 20+ client UI projects across fintech and ed-tech verticals.',
    'Standardized asset export workflow, cutting delivery time by 30%.',
    'Built reusable illustration and icon sets for remote design team.',
  ],
  '06': [
    'Designed assessment platform UI for developer hiring workflows.',
    'Created brand-aligned social graphics for product launch campaign.',
  ],
  '07': [
    'Designed NGO outreach materials for education empowerment programs.',
    'Built social media templates increasing volunteer sign-up visibility.',
  ],
}

const ROW_SHELL =
  'overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] motion-safe:transition-shadow motion-reduce:transition-none'

const TRIGGER_FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 text-zinc-400 motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none ${
        open ? 'rotate-180' : 'rotate-0'
      }`}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IndexBadge({ index }: { index: string }) {
  return <span className="font-mono text-xs font-semibold text-blue-600">{index}</span>
}

// ── List ──────────────────────────────────────────────────────────────────────

export default function ExperienceRowList() {
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null)

  const toggle = (index: string) => {
    setExpandedIndex(prev => (prev === index ? null : index))
  }

  return (
    <ol className="flex flex-col gap-2.5" aria-label="Professional experience">
      {EXPERIENCE.map(row => {
        const panelId = `experience-panel-${row.index}`
        const triggerId = `experience-trigger-${row.index}`
        const isOpen = expandedIndex === row.index
        const isCurrent = row.index === '01'
        const highlights = HIGHLIGHTS[row.index] ?? []

        return (
          <li
            key={row.index}
            className={`${ROW_SHELL} ${isOpen ? 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : ''}`}
          >
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(row.index)}
              className={`group flex w-full items-start justify-between gap-4 px-5 py-4 text-left motion-safe:transition-colors motion-reduce:transition-none ${TRIGGER_FOCUS} ${
                isOpen ? 'bg-[#fcfbfa]' : 'hover:bg-zinc-50'
              }`}
            >
              <span className="min-w-0 flex-1 text-sm leading-snug">
                <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                  <IndexBadge index={row.index} />
                  <span className="text-zinc-300" aria-hidden="true">
                    |
                  </span>
                  <span className="font-semibold text-zinc-900">{row.label}</span>
                  {isCurrent && (
                    <span className="rounded-full border border-black bg-blue-600 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                      Current
                    </span>
                  )}
                </span>
              </span>

              <span className="flex shrink-0 items-center gap-2 pt-0.5">
                <span className="hidden font-mono text-[10px] font-semibold uppercase tracking-wide text-zinc-400 sm:block">
                  {row.date.replace(' - ', ' – ').replace('Present', 'Present')}
                </span>
                <ChevronIcon open={isOpen} />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid border-t-2 border-black/10 motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t-2 border-black bg-[#fcfbfa] px-5 py-4">
                  <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-400 sm:hidden">
                    {row.date.replace(' - ', ' – ')}
                  </p>
                  <ul className="space-y-2.5 text-sm leading-relaxed text-zinc-600">
                    {highlights.map(point => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-900"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
