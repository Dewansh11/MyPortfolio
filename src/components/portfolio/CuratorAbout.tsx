import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'

// ── Static data ───────────────────────────────────────────────────────────────

const TOOLS = [
  { name: 'Notion', img: '/logo-figma.png' },
  { name: 'Claude', img: '/logo-framer.png' },
  { name: 'Figma', img: '/logo-illustrator.png' },
  { name: 'Framer', img: '/logo-cursor.png' },
  { name: 'Cursor', img: '/logo-claude.png' },
  { name: 'GitHub', img: '/logo-github.png' },
  { name: 'Illustrator', img: '/logo-notion.png' },
] as const

/** Swap titles, artists, and audio files in /public/audio/ */
const PLAYLIST_TRACKS = [
  { id: 'take-five', title: 'Take Five', artist: 'Dave Brubeck Quartet', audioSrc: '/audio/take-five.mp3' },
  { id: 'so-what', title: 'So What', artist: 'Miles Davis', audioSrc: '/audio/so-what.mp3' },
  { id: 'autumn-leaves', title: 'Autumn Leaves', artist: 'Cannonball Adderley', audioSrc: '/audio/autumn-leaves.mp3' },
  { id: 'round-midnight', title: "'Round Midnight", artist: 'Thelonious Monk', audioSrc: '/audio/round-midnight.mp3' },
  { id: 'track-05', title: 'Coming Soon', artist: '—', audioSrc: '' },
] as const

const PHOTO_FRAMES = [
  { type: 'img' as const, src: '/dewansh.png', alt: 'Portrait', rotate: -3 },
  { type: 'img' as const, src: '/dewansh2.png', alt: 'Sky & Astronomy', rotate: 2 },
  { type: 'ph' as const, src: null, alt: 'Museum Antique', rotate: -2 },
  { type: 'img' as const, src: '/dewansh.png', alt: 'Portrait b', rotate: 3 },
  { type: 'img' as const, src: '/dewansh2.png', alt: 'Astronomy b', rotate: -1 },
  { type: 'ph' as const, src: null, alt: 'Archive', rotate: 2 },
] as const

const PHOTO_SCROLL_W = PHOTO_FRAMES.length * (144 + 16)

const BRUTAL_CARD =
  'w-full overflow-hidden rounded-2xl border-[3px] border-black bg-[#fcfbfa] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'

const ID_CARD_QR_TARGET = '/resume'

const ID_CARD_DETAILS = [
  { label: 'ROLE:', value: 'PRODUCT DESIGNER' },
  { label: 'EXP:', value: '4+ YEARS' },
  { label: 'EDU:', value: 'M.DES · UX DESIGN' },
  { label: 'LOC:', value: 'INDIA · IST' },
] as const

function useIdCardQrUrl(target: string): string {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (target.startsWith('http://') || target.startsWith('https://')) {
      setUrl(target)
      return
    }
    setUrl(`${window.location.origin}${target.startsWith('/') ? target : `/${target}`}`)
  }, [target])

  return url
}

// ── Tools card — always-visible logo grid ─────────────────────────────────────

function ToolsStackCard() {
  return (
    <article className={`${BRUTAL_CARD} flex h-full flex-col`}>
      <div className="flex items-center justify-between border-b-[3px] border-black bg-blue-600 px-4 py-2.5">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white">
          Tools I Use
        </p>
        <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-white/70">
          {TOOLS.length} tools
        </span>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-2.5 p-3 sm:grid-cols-4 sm:gap-3 sm:p-4">
        {TOOLS.map(tool => (
          <div
            key={tool.name}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-black bg-white p-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] motion-safe:transition-transform motion-reduce:transition-none hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:gap-2 sm:p-3"
          >
            <img
              src={tool.img}
              alt={tool.name}
              className="h-8 w-8 object-contain"
              draggable={false}
            />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-zinc-700">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </article>
  )
}

// ── ID card — landscape badge ─────────────────────────────────────────────────

function HangingIdCard() {
  const qrUrl = useIdCardQrUrl(ID_CARD_QR_TARGET)

  return (
    <article id="hanging-id-card" className={`${BRUTAL_CARD} flex h-full flex-col`}>
      {/* Header — name + status */}
      <div className="flex items-start justify-between gap-3 border-b-[3px] border-black px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-mono text-sm font-semibold uppercase tracking-wide text-black">
            Dewansh Saxena
          </p>
          <p className="mt-0.5 font-mono text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            Product Designer · UX
          </p>
        </div>
        <span className="shrink-0 rounded-full border-2 border-black bg-red-600 px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Open for Work
        </span>
      </div>

      {/* Body — photo + details */}
      <div className="flex flex-1 gap-4 p-4">
        <img
          src="/dewansh-id-photo.png"
          alt="Dewansh Saxena, UX/Product Designer"
          className="h-auto w-[88px] shrink-0 self-start rounded-xl border-2 border-black object-cover object-bottom sm:w-[96px]"
          style={{ aspectRatio: '3/4' }}
          draggable={false}
        />

        <dl className="flex min-w-0 flex-1 flex-col justify-center gap-2.5">
          {ID_CARD_DETAILS.map(({ label, value }) => (
            <div key={label} className="flex items-baseline justify-between gap-2 border-b border-zinc-100 pb-2 last:border-0 last:pb-0">
              <dt className="shrink-0 font-mono text-[9px] font-medium uppercase tracking-widest text-zinc-400">
                {label.replace(':', '')}
              </dt>
              <dd className="text-right font-mono text-[10px] font-semibold uppercase leading-snug tracking-wide text-zinc-800">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Footer — QR strip */}
      {qrUrl && (
        <a
          href={ID_CARD_QR_TARGET}
          className="group flex items-center gap-3 border-t-[3px] border-black bg-zinc-50 px-4 py-3 motion-safe:transition-colors hover:bg-zinc-100"
          aria-label="Scan QR code or tap to view resume"
        >
          <div className="shrink-0 border-2 border-black bg-white p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] motion-safe:transition-transform group-hover:translate-x-[1px] group-hover:translate-y-[1px]">
            <QRCodeSVG
              value={qrUrl}
              size={48}
              fgColor="#000000"
              bgColor="#ffffff"
              level="M"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-black">
              Scan · Resume
            </p>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-zinc-400">
              Tap to open full CV
            </p>
          </div>
        </a>
      )}
    </article>
  )
}

// ── Playlist — rectangular card ─────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M2.5 1.5L9.5 6L2.5 10.5V1.5Z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <rect x="2" y="1.5" width="2.5" height="9" />
      <rect x="7.5" y="1.5" width="2.5" height="9" />
    </svg>
  )
}

function PlaylistOfTheWeek() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const handleTrackClick = async (track: (typeof PLAYLIST_TRACKS)[number]) => {
    if (!track.audioSrc) return

    const audio = audioRef.current
    if (!audio) return

    if (activeId === track.id) {
      if (isPlaying) {
        audio.pause()
      } else {
        try {
          await audio.play()
        } catch {
          setIsPlaying(false)
        }
      }
      return
    }

    setActiveId(track.id)
    audio.src = track.audioSrc
    audio.currentTime = 0
    try {
      await audio.play()
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <article className={`${BRUTAL_CARD} flex h-full flex-col`}>
      <audio ref={audioRef} preload="metadata" className="hidden" />

      <div className="border-b-[3px] border-black bg-yellow-400 px-4 py-2.5">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-black">
          My Playlist
        </p>
      </div>

      <ul className="divide-y divide-black/20">
        {PLAYLIST_TRACKS.map((track, index) => {
          const isDisabled = !track.audioSrc
          const isActive = activeId === track.id
          const showPause = isActive && isPlaying

          return (
            <li key={track.id}>
              <button
                type="button"
                onClick={() => handleTrackClick(track)}
                disabled={isDisabled}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${
                  isActive && !isDisabled ? 'bg-yellow-50' : ''
                }`}
                aria-label={
                  isDisabled
                    ? `${track.title} — coming soon`
                    : showPause
                      ? `Pause ${track.title} by ${track.artist}`
                      : `Play ${track.title} by ${track.artist}`
                }
                aria-pressed={showPause}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-black font-mono text-[10px] font-bold ${
                    isActive && !isDisabled
                      ? 'bg-yellow-400 text-black'
                      : 'bg-black text-white'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-xs font-semibold uppercase text-black">
                    {track.title}
                  </span>
                  <span className="block truncate font-mono text-[10px] font-medium text-zinc-500">
                    {track.artist}
                  </span>
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-white text-black ${
                    showPause ? 'motion-safe:animate-pulse' : ''
                  }`}
                >
                  {isDisabled ? (
                    <span className="font-mono text-[8px] font-bold uppercase text-zinc-400">—</span>
                  ) : showPause ? (
                    <PauseIcon />
                  ) : (
                    <PlayIcon />
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <p className="border-t-[3px] border-black px-4 py-2 text-right font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        5 tracks · jazz
      </p>
    </article>
  )
}

// ── Photo slider ──────────────────────────────────────────────────────────────

function PhotographyField() {
  const frames = [...PHOTO_FRAMES, ...PHOTO_FRAMES]

  return (
    <div className="relative my-6 w-full overflow-x-hidden py-4">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14"
        style={{ background: 'linear-gradient(to right, #f6f8fa 30%, transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14"
        style={{ background: 'linear-gradient(to left, #f6f8fa 30%, transparent)' }}
      />
      <motion.div
        className="flex items-center gap-4 py-2"
        animate={{ x: [0, -PHOTO_SCROLL_W] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
      >
        {frames.map((frame, i) =>
          frame.type === 'img' ? (
            <img
              key={i}
              src={frame.src}
              alt={frame.alt}
              draggable={false}
              className="h-44 w-36 shrink-0 rounded-2xl border-2 border-black object-cover shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ transform: `rotate(${frame.rotate}deg)` }}
            />
          ) : (
            <div
              key={i}
              className="flex h-44 w-36 shrink-0 flex-col items-end justify-end rounded-2xl border-2 border-black bg-zinc-100 p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ transform: `rotate(${frame.rotate}deg)` }}
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">add photo</span>
            </div>
          ),
        )}
      </motion.div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function CuratorAbout() {
  return (
    <section id="about-bento" className="relative z-10 w-full scroll-mt-28">
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="block h-3 w-3 shrink-0 rounded-sm bg-orange-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">About Me</span>
        </div>

        {/* Row 1 — bio + ID card side by side */}
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black lg:text-4xl">
              Life in a nutshell
            </h2>
            <p className="mb-3 text-base leading-relaxed text-zinc-500">
              I hold a Master of Design (M.Des) in UX Design, which shapes how I look at interfaces. I
              approach product design with the meticulous curation of an art museum—every detail,
              component, and spatial transition must serve an intentional purpose.
            </p>
            <p className="text-base leading-relaxed text-zinc-500">
              I am a huge music geek and jazz enthusiast, fascinated by antiques, astronomy, and
              spiritual architecture literature. When a project hits maximum complexity, that is where I
              thrive; I firmly believe my absolute best work is forged under structural challenges and
              tight pressure.
            </p>
          </div>

          <div className="md:col-span-5">
            <HangingIdCard />
          </div>
        </div>

        {/* Row 2 — tools + playlist aligned */}
        <div className="mt-6 grid grid-cols-1 items-stretch gap-6 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <ToolsStackCard />
          </div>

          <div className="md:col-span-5">
            <PlaylistOfTheWeek />
          </div>
        </div>
      </div>

      <PhotographyField />
    </section>
  )
}
