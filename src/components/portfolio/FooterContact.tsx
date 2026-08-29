import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const CONTACT_EMAIL = 'dewansh.saxena@outlook.com'

const DRAG_SPRING = { bounceStiffness: 520, bounceDamping: 18 }

const STICKERS = [
  {
    id: 'vibe',
    label: '[ Cool Vibe ⚡ ]',
    className:
      'bg-blue-600 text-white font-mono text-xs font-bold p-3 rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] top-8 left-6 rotate-6',
  },
  {
    id: 'audit',
    label: '[ M.Des System Audit ]',
    className:
      'bg-orange-500 text-white font-mono text-xs font-bold p-3 rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] top-24 left-32 -rotate-3',
  },
  {
    id: 'clarity',
    label: '[ Absolute Clarity ❖ ]',
    className:
      'bg-zinc-900 text-white font-mono text-xs font-bold p-3 rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] top-12 right-8 rotate-2',
  },
] as const

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-zinc-500"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function FooterContact() {
  const fieldRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [])

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden border-t-2 border-black bg-[#f6f8fa] px-6 py-24"
    >
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-12">
        {/* Left — contact console */}
        <div className="md:col-span-6">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            CONTACT
          </p>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black">
            Let&apos;s build systems together.
          </h2>

          <button
            type="button"
            onClick={copyEmail}
            className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-black bg-white p-6 text-sm font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <span className="flex min-w-0 items-center gap-3 text-zinc-900">
              <MailIcon />
              <span className="truncate">{CONTACT_EMAIL}</span>
            </span>
            <span className="shrink-0 font-mono text-xs font-bold uppercase tracking-wide text-blue-600 group-hover:text-blue-700">
              {copied ? 'Copied ✓' : 'Copy Email ➔'}
            </span>
          </button>
        </div>

        {/* Right — draggable sticker field */}
        <div
          ref={fieldRef}
          className="relative h-64 overflow-visible rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-100/30 md:col-span-6"
        >
          {STICKERS.map(sticker => (
            <motion.div
              key={sticker.id}
              drag
              dragConstraints={fieldRef}
              dragElastic={0.18}
              dragMomentum={false}
              dragTransition={DRAG_SPRING}
              whileDrag={{ scale: 1.04, zIndex: 20 }}
              className={`absolute cursor-grab select-none active:cursor-grabbing ${sticker.className}`}
            >
              {sticker.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
