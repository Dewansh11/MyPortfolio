import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Constants ─────────────────────────────────────────────────────────────────
const CANVAS_H = 384    // matches Tailwind h-96 (24rem @ 16px base)
const NODE_R   = 24     // half of 48px node (w-12 h-12)
const MAGNET_RADIUS   = 90
const MAGNET_STRENGTH = 0.3

// ── Types ─────────────────────────────────────────────────────────────────────
interface ToolNodeData {
  name:        string
  imgSrc:      string
  brandColor:  string
  xPct:        number   // home X as % of canvas width
  yPct:        number   // home Y as % of CANVAS_H
  description: string
}

// ── Tool definitions ──────────────────────────────────────────────────────────
const TOOLS: ToolNodeData[] = [
  {
    name: 'Figma',
    imgSrc: '/logo-figma.png',
    brandColor: '#F24E1E',
    xPct: 10, yPct: 20,
    description: 'Where my concepts take shape — from initial wireframes to polished layout-system specs.',
  },
  {
    name: 'Framer',
    imgSrc: '/logo-framer.png',
    brandColor: '#0055FF',
    xPct: 38, yPct: 12,
    description: 'For micro-interaction specs and high-fidelity motion prototyping.',
  },
  {
    name: 'Illustrator',
    imgSrc: '/logo-illustrator.png',
    brandColor: '#FF9A00',
    xPct: 68, yPct: 22,
    description: 'For custom vector work, refined iconography, and precision branding assets.',
  },
  {
    name: 'Cursor',
    imgSrc: '/logo-cursor.png',
    brandColor: '#2563EB',
    xPct: 18, yPct: 62,
    description: 'My primary development workspace — where designs become clean, production React code.',
  },
  {
    name: 'Claude',
    imgSrc: '/logo-claude.png',
    brandColor: '#D97706',
    xPct: 50, yPct: 65,
    description: 'My collaborative partner for rapid layout engineering and architecture reviews.',
  },
  {
    name: 'GitHub',
    imgSrc: '/logo-github.png',
    brandColor: '#181717',
    xPct: 82, yPct: 52,
    description: 'Where I manage code versions, track software assets, and protect project stability.',
  },
  {
    name: 'Notion',
    imgSrc: '/logo-notion.png',
    brandColor: '#18181B',
    xPct: 37, yPct: 86,
    description: 'Keeping project briefs, user insights, and business requirements organized.',
  },
]

// Logical wiring rendered as SVG connector lines
const CONNECTIONS: readonly [string, string][] = [
  ['Figma',  'Framer'],
  ['Figma',  'Cursor'],
  ['Framer', 'Illustrator'],
  ['Cursor', 'Claude'],
  ['Cursor', 'GitHub'],
  ['Claude', 'GitHub'],
  ['Notion', 'Claude'],
] as const

// ── Position math ─────────────────────────────────────────────────────────────
interface NodePos {
  homeX:   number
  homeY:   number
  targetX: number
  targetY: number
}

function computePos(
  xPct: number,
  yPct: number,
  canvasW: number,
  mouse: { x: number; y: number } | null,
): NodePos {
  const homeX = (xPct / 100) * canvasW
  const homeY = (yPct / 100) * CANVAS_H

  if (!mouse) return { homeX, homeY, targetX: homeX, targetY: homeY }

  const dx   = mouse.x - homeX
  const dy   = mouse.y - homeY
  const dist = Math.sqrt(dx * dx + dy * dy)

  if (dist < MAGNET_RADIUS && dist > 0) {
    const f = (1 - dist / MAGNET_RADIUS) * MAGNET_STRENGTH
    return { homeX, homeY, targetX: homeX + dx * f, targetY: homeY + dy * f }
  }

  return { homeX, homeY, targetX: homeX, targetY: homeY }
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function ToolsSection() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const rafRef    = useRef<number>(0)

  const [canvasW,    setCanvasW]    = useState(640)
  const [mouse,      setMouse]      = useState<{ x: number; y: number } | null>(null)
  const [activeNode, setActiveNode] = useState<string | null>(null)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setCanvasW(e.contentRect.width))
    ro.observe(el)
    setCanvasW(el.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => setMouse({ x: cx, y: cy }))
  }

  const onMouseLeave = () => {
    cancelAnimationFrame(rafRef.current)
    setMouse(null)
  }

  const nodes = useMemo(
    () => TOOLS.map(t => ({ ...t, ...computePos(t.xPct, t.yPct, canvasW, mouse) })),
    [canvasW, mouse],
  )

  const activeDesc = activeNode
    ? (TOOLS.find(t => t.name === activeNode)?.description ?? null)
    : null

  return (
    <section className="w-full bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-start">

          {/* ── Left text anchor ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="block h-3 w-3 flex-shrink-0 rounded-sm bg-orange-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Tools &amp; Stack
              </span>
            </div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-zinc-900 lg:text-4xl">
              The software and models I rely on to map ideas, write code, and organize projects.
            </h2>
          </motion.div>

          {/* ── Right node canvas ─────────────────────────────────────────────── */}
          <div className="md:col-span-8">

            {/* Canvas area */}
            <div
              ref={canvasRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className="relative h-96 overflow-hidden rounded-2xl border border-zinc-200 bg-white"
            >
              {/* Layer 1: blueprint dot grid */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="tc-dots"
                    x="0" y="0" width="24" height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="0.9" fill="#E4E4E7" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#tc-dots)" />
              </svg>

              {/* Layer 2: connector lines */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {CONNECTIONS.map(([aName, bName]) => {
                  const a = nodes.find(n => n.name === aName)
                  const b = nodes.find(n => n.name === bName)
                  if (!a || !b) return null
                  const lit = activeNode === aName || activeNode === bName
                  return (
                    <line
                      key={`${aName}--${bName}`}
                      x1={a.targetX} y1={a.targetY}
                      x2={b.targetX} y2={b.targetY}
                      stroke={lit ? '#A1A1AA' : '#D4D4D8'}
                      strokeWidth={lit ? 1.5 : 1}
                      strokeDasharray={lit ? undefined : '4 5'}
                    />
                  )
                })}
              </svg>

              {/* Layer 3: tool nodes */}
              {nodes.map(node => {
                const isActive = activeNode === node.name
                return (
                  <motion.div
                    key={node.name}
                    animate={{ x: node.targetX, y: node.targetY }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.4 }}
                    onHoverStart={() => setActiveNode(node.name)}
                    onHoverEnd={() => setActiveNode(null)}
                    className="absolute h-12 w-12 cursor-pointer"
                    style={{ left: -NODE_R, top: -NODE_R }}
                  >
                    {/* Badge */}
                    <motion.div
                      animate={{
                        borderColor:     isActive ? node.brandColor : '#E4E4E7',
                        backgroundColor: '#FFFFFF',
                        boxShadow: isActive
                          ? `0 0 0 3px ${node.brandColor}28, 0 2px 8px rgba(0,0,0,0.08)`
                          : '0 1px 3px rgba(0,0,0,0.06)',
                      }}
                      whileHover={{ scale: 1.13 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border-2"
                    >
                      <img
                        src={node.imgSrc}
                        alt={node.name}
                        className="h-8 w-8 object-contain"
                        draggable={false}
                      />
                    </motion.div>

                    {/* Coordinate tag */}
                    <p className="pointer-events-none absolute left-0 top-full mt-1 w-max font-mono text-xs text-zinc-400">
                      [X:{Math.round(node.homeX)}]
                    </p>
                  </motion.div>
                )
              })}
            </div>

            {/* Insight console */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4"
            >
              <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400">
                INSIGHT_CONTEXT
              </p>
              <div className="relative h-10">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeNode ?? '__idle__'}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute inset-0 font-mono text-sm leading-relaxed text-zinc-600"
                  >
                    {activeDesc ? `> ${activeDesc}` : '> hover any node to load context...'}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
