import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, useCallback, useEffect } from 'react'

const CARD_W = 138

// Warm, designer-friendly palette — not corporate HR blue
const HOLDER = '#C4A882'
const HOLDER_DARK = '#A88862'
const HOLDER_LIGHT = '#D9C4A8'
const REEL = '#8B7355'
const REEL_LIGHT = '#A89078'
const ACCENT = '#2F68C0'

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E\")"

export default function IdBadge() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [settled, setSettled] = useState(false)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springCfg = { stiffness: 140, damping: 22, mass: 0.6 }

  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), springCfg)
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), springCfg)
  const shiftX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4, 4]), springCfg)
  const shiftY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-3, 3]), springCfg)

  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(true), 2800)
    return () => window.clearTimeout(timer)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!settled || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5)
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [settled, pointerX, pointerY],
  )

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0)
    pointerY.set(0)
  }, [pointerX, pointerY])

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: 'relative',
        display: 'inline-block',
        paddingTop: 6,
        touchAction: 'none',
        perspective: 900,
      }}
    >
      {/* Invisible lanyard anchor */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          height: 10,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.04))',
          borderRadius: 1,
        }}
      />

      {/* Drop + damped pendulum swing */}
      <motion.div
        style={{ transformOrigin: '50% 0%' }}
        initial={{ y: -240, rotate: 0, opacity: 0 }}
        animate={{
          y: 0,
          rotate: [0, 6.5, -4.8, 2.6, -1.2, 0],
          opacity: 1,
        }}
        transition={{
          y: {
            type: 'spring',
            stiffness: 155,
            damping: 11,
            mass: 1.08,
            delay: 0.08,
          },
          rotate: {
            delay: 0.62,
            duration: 2.1,
            times: [0, 0.18, 0.42, 0.62, 0.82, 1],
            ease: [0.42, 0, 0.2, 1],
          },
          opacity: { duration: 0.3, delay: 0.05 },
        }}
      >
        {/* Hover parallax tilt — only active after settle */}
        <motion.div
          style={{
            rotateX: settled ? tiltX : 0,
            rotateY: settled ? tiltY : 0,
            x: settled ? shiftX : 0,
            y: settled ? shiftY : 0,
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              filter:
                'drop-shadow(0 18px 32px rgba(60, 45, 30, 0.16)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.08))',
            }}
          >
            {/* Retractable reel */}
            <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: `linear-gradient(145deg, ${REEL_LIGHT} 0%, ${REEL} 55%, #6E5A44 100%)`,
                  boxShadow:
                    'inset 0 2px 4px rgba(255,255,255,0.28), inset 0 -2px 4px rgba(0,0,0,0.12), 0 3px 8px rgba(60,45,30,0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: NOISE,
                    opacity: 0.5,
                    pointerEvents: 'none',
                  }}
                />
                <span
                  style={{
                    fontFamily: '"Unigeo 32", sans-serif',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.82)',
                    textTransform: 'uppercase',
                  }}
                >
                  ds
                </span>
              </div>
              <div
                style={{
                  width: 14,
                  height: 9,
                  marginTop: -1,
                  background: `linear-gradient(to bottom, ${REEL}, ${HOLDER_DARK})`,
                  borderRadius: '0 0 3px 3px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              />
            </div>

            {/* Thin connector strap */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: -1,
                marginBottom: 1,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '2px solid #B8923A',
                  background: 'linear-gradient(135deg, #E8C96A 0%, #C9A227 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.45), 0 1px 2px rgba(0,0,0,0.15)',
                }}
              />
              <div
                style={{
                  width: 20,
                  height: 10,
                  marginTop: -1,
                  background: 'linear-gradient(to bottom, #F0EDE8, #E4DFD6)',
                  border: '1px solid #CFC8BC',
                  borderRadius: 2,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
                }}
              />
              <div
                style={{
                  width: 2,
                  height: 14,
                  background: 'linear-gradient(to bottom, #D8D2C8, #B8B0A4)',
                  borderRadius: 1,
                }}
              />
            </div>

            {/* Plastic holder frame */}
            <div style={{ position: 'relative', width: CARD_W + 24, paddingTop: 2 }}>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: 1,
                  top: '32%',
                  width: 10,
                  height: 58,
                  background: `linear-gradient(to right, ${HOLDER_DARK}, ${HOLDER})`,
                  borderRadius: '3px 0 0 3px',
                  boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.1)',
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: 1,
                  top: '32%',
                  width: 10,
                  height: 58,
                  background: `linear-gradient(to left, ${HOLDER_DARK}, ${HOLDER})`,
                  borderRadius: '0 3px 3px 0',
                  boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.1)',
                }}
              />

              <div
                style={{
                  margin: '0 auto',
                  width: CARD_W,
                  background: `linear-gradient(160deg, ${HOLDER_LIGHT} 0%, ${HOLDER} 45%, ${HOLDER_DARK} 100%)`,
                  padding: 5,
                  borderRadius: 3,
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.08), 0 2px 6px rgba(60,45,30,0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: NOISE,
                    opacity: 0.35,
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    background: '#FAFAF8',
                    overflow: 'hidden',
                    borderRadius: 1,
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    style={{
                      height: 3,
                      background: `linear-gradient(90deg, ${ACCENT} 0%, #5B8FD4 100%)`,
                    }}
                  />

                  <img
                    src="/dewansh2.png"
                    alt="Dewansh Saxena"
                    style={{
                      width: '100%',
                      height: 152,
                      objectFit: 'cover',
                      objectPosition: 'center 16%',
                      display: 'block',
                    }}
                  />

                  <div style={{ padding: '10px 11px 12px', textAlign: 'left' }}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: '"Unigeo 32", sans-serif',
                        fontSize: 14.5,
                        fontWeight: 700,
                        lineHeight: 1.15,
                        letterSpacing: '-0.03em',
                        color: '#1A1714',
                      }}
                    >
                      Dewansh Saxena
                    </p>
                    <p
                      style={{
                        margin: '4px 0 0',
                        fontFamily: '"Unigeo 32", sans-serif',
                        fontSize: 10.5,
                        fontWeight: 600,
                        lineHeight: 1.2,
                        letterSpacing: '0.01em',
                        color: ACCENT,
                      }}
                    >
                      Product Designer
                    </p>
                    <p
                      style={{
                        margin: '5px 0 0',
                        fontFamily: '"Unigeo 32", sans-serif',
                        fontSize: 9,
                        fontWeight: 500,
                        lineHeight: 1.2,
                        letterSpacing: '0.02em',
                        color: '#78716C',
                      }}
                    >
                      Gurugram, India
                    </p>
                  </div>
                </div>
              </div>

              <div
                aria-hidden="true"
                style={{
                  width: 28,
                  height: 6,
                  margin: '0 auto',
                  marginTop: -1,
                  background: HOLDER_DARK,
                  borderRadius: '0 0 2px 2px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
