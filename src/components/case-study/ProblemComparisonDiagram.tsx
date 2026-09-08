import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { type CSSProperties, type ReactNode, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

const TYPICAL_STEPS = [
  { label: 'Browse', top: 0, left: 0, rotate: -8, zIndex: 1 },
  { label: 'Sign up', top: 30, left: 18, rotate: 7, zIndex: 2 },
  { label: 'Read docs', top: 58, left: 2, rotate: -6, zIndex: 3 },
  { label: 'Fund wallet', top: 88, left: 20, rotate: 8, zIndex: 4 },
  { label: 'Place order', top: 116, left: 4, rotate: -5, zIndex: 5 },
  { label: 'Confirm', top: 144, left: 16, rotate: 7, zIndex: 6 },
] as const

const AFTER_CARDS = ['Browse', 'See odds'] as const

const COLUMN_LABEL =
  'text-[11px] font-bold uppercase tracking-[0.16em] text-[#57534E]'
const STEP_COUNT = 'text-[2.875rem] font-bold leading-none tracking-tight tabular-nums'

function HardShadowCard({
  children,
  className = '',
  innerClassName = 'bg-[#fcfbfa] px-4 py-2.5 text-xs font-medium text-zinc-800',
  shadowClassName = 'translate-x-1.5 translate-y-1.5 rounded-2xl',
  interactive = false,
}: {
  children: ReactNode
  className?: string
  innerClassName?: string
  shadowClassName?: string
  interactive?: boolean
}) {
  const reduceMotion = useReducedMotion()

  const inner = (
    <div
      className={`relative rounded-2xl border-2 border-black ${innerClassName}`}
    >
      {children}
    </div>
  )

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 border-2 border-black bg-black ${shadowClassName}`}
      />
      {interactive && !reduceMotion ? (
        <motion.div
          className="relative"
          whileHover={{ x: 3, y: 3 }}
          whileTap={{ x: 5, y: 5 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {inner}
        </motion.div>
      ) : (
        inner
      )}
    </div>
  )
}

function PileCard({
  label,
  style,
  rotate,
  index,
}: {
  label: string
  style: CSSProperties
  rotate: number
  index: number
}) {
  const reduceMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="absolute cursor-default"
      style={{
        top: style.top,
        left: style.left,
        zIndex: isHovered ? 20 : style.zIndex,
        rotate,
      }}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.85, y: 12 }}
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                delay: 0.35 + index * 0.07,
                duration: 0.45,
                ease: EASE,
              },
            }
      }
      viewport={{ once: true, margin: '-40px' }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.06,
              rotate: rotate + (rotate > 0 ? 3 : -3),
              transition: { type: 'spring', stiffness: 420, damping: 22 },
            }
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <HardShadowCard innerClassName="whitespace-nowrap bg-[#fcfbfa] px-3.5 py-2 text-xs font-semibold text-zinc-800">
        {label}
      </HardShadowCard>
    </motion.div>
  )
}

function ClusterPanel({
  children,
  innerClassName,
  initial,
  whileInView,
  transition,
}: {
  children: ReactNode
  innerClassName: string
  initial?: HTMLMotionProps<'div'>['initial']
  whileInView?: HTMLMotionProps<'div'>['whileInView']
  transition?: HTMLMotionProps<'div'>['transition']
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative w-fit shrink-0"
      initial={reduceMotion ? false : initial}
      whileInView={reduceMotion ? undefined : whileInView}
      viewport={{ once: true, margin: '-60px' }}
      transition={transition}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -2,
              transition: { type: 'spring', stiffness: 400, damping: 28 },
            }
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-x-[5px] translate-y-[5px] rounded-2xl border-2 border-black bg-black"
      />
      <div
        className={`relative rounded-2xl border-2 border-black px-5 py-5 ${innerClassName}`}
      >
        {children}
      </div>
    </motion.div>
  )
}

function PanelHeader({
  count,
  countClassName,
  label,
  labelClassName = '',
  delay = 0,
}: {
  count: string
  countClassName: string
  label: string
  labelClassName?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <motion.p
        className={`${STEP_COUNT} ${countClassName}`}
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                scale: 1,
                transition: { delay, duration: 0.5, ease: EASE },
              }
        }
        viewport={{ once: true }}
      >
        {count}
      </motion.p>
      <motion.p
        className={`${COLUMN_LABEL} mt-2 whitespace-nowrap ${labelClassName}`}
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
                transition: { delay: delay + 0.08, duration: 0.4, ease: EASE },
              }
        }
        viewport={{ once: true }}
      >
        {label}
      </motion.p>
    </div>
  )
}

function FlowArrow() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.span
      aria-hidden="true"
      className="shrink-0 rotate-90 text-2xl font-bold leading-none text-orange-500 md:rotate-0"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              scale: 1,
              transition: { delay: 0.55, duration: 0.4, ease: EASE },
            }
      }
      viewport={{ once: true }}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 5, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              x: {
                delay: 1.2,
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }
      }
    >
      →
    </motion.span>
  )
}

function SpeechBubble({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative ml-2 w-fit shrink-0"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.8, x: -6 }}
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              scale: 1,
              x: 0,
              transition: { delay, type: 'spring', stiffness: 380, damping: 22 },
            }
      }
      viewport={{ once: true }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.05,
              transition: { type: 'spring', stiffness: 400, damping: 24 },
            }
      }
    >
      <div
        aria-hidden="true"
        className="absolute -left-1 top-1/2 z-10 h-2 w-2 -translate-y-1/2 rotate-45 border-b-2 border-l-2 border-black bg-[#fcfbfa]"
      />
      <p className="whitespace-nowrap rounded-full border-2 border-black bg-[#fcfbfa] px-2.5 py-1 text-[10px] font-bold text-orange-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {children}
      </p>
    </motion.div>
  )
}

export default function ProblemComparisonDiagram() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="mx-auto w-fit"
      role="img"
      aria-label="Typical prediction market with six cluttered steps versus Porvenix with two clear steps"
    >
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-stretch md:gap-12">
        <ClusterPanel
          innerClassName="flex flex-col bg-[#EFEDE4]"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <PanelHeader
            count="6"
            countClassName="text-[#A8A29E]"
            label="Typical prediction market"
            delay={0.15}
          />

          <div className="relative mt-5 h-[11.25rem] w-[10.5rem]">
            {TYPICAL_STEPS.map((step, index) => (
              <PileCard
                key={step.label}
                label={step.label}
                index={index}
                rotate={step.rotate}
                style={{
                  top: step.top,
                  left: step.left,
                  zIndex: step.zIndex,
                }}
              />
            ))}
          </div>
        </ClusterPanel>

        <div className="flex shrink-0 items-center self-center">
          <FlowArrow />
        </div>

        <ClusterPanel
          innerClassName="flex flex-col bg-[#fcfbfa]"
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
        >
          <PanelHeader
            count="2"
            countClassName="text-orange-500"
            label="Porvenix"
            delay={0.25}
          />

          <div className="mt-5 flex w-[10.5rem] flex-1 flex-col gap-5">
            {AFTER_CARDS.map((label, index) => (
              <motion.div
                key={label}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0.45 + index * 0.12,
                          duration: 0.45,
                          ease: EASE,
                        },
                      }
                }
                viewport={{ once: true, margin: '-40px' }}
              >
                <HardShadowCard
                  interactive
                  shadowClassName="translate-x-[5px] translate-y-[5px] rounded-2xl"
                  innerClassName="cursor-pointer bg-orange-500 px-5 py-4 text-sm font-bold text-zinc-900"
                >
                  {label}
                </HardShadowCard>
              </motion.div>
            ))}

            <motion.div
              className="flex items-center pt-0.5"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.75, duration: 0.4, ease: EASE },
                    }
              }
              viewport={{ once: true }}
            >
              <motion.span
                className="rounded-full border-2 border-zinc-300 bg-white/60 px-2.5 py-1 text-[10px] font-semibold text-zinc-400"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.04,
                        borderColor: '#A8A29E',
                        transition: { type: 'spring', stiffness: 400, damping: 24 },
                      }
                }
              >
                ✓ Done
              </motion.span>
              <SpeechBubble delay={0.88}>3x fewer</SpeechBubble>
            </motion.div>
          </div>
        </ClusterPanel>
      </div>

      <motion.p
        className="mt-8 text-center text-sm leading-relaxed text-zinc-500"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
                transition: { delay: 0.9, duration: 0.45, ease: EASE },
              }
        }
        viewport={{ once: true }}
      >
        6 competing steps, vs. 2 clear ones.
      </motion.p>
    </div>
  )
}
