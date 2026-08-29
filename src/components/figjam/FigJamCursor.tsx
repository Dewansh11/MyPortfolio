import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface FigJamCursorProps {
  name?: string
}

export default function FigJamCursor({ name = 'You' }: FigJamCursorProps) {
  const cursorX = useMotionValue(-400)
  const cursorY = useMotionValue(-400)
  const [visible, setVisible] = useState(false)

  const springX = useSpring(cursorX, { stiffness: 420, damping: 32 })
  const springY = useSpring(cursorY, { stiffness: 420, damping: 32 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[99999]"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* Black arrow — replicates the FigJam "You" cursor exactly */}
      <svg
        width="16"
        height="18"
        viewBox="0 0 24 28"
        fill="none"
        style={{ display: 'block' }}
      >
        <path
          d="M3 2L3 23L8.5 17.5L12.5 26L16 24.5L12 16L20.5 16L3 2Z"
          fill="#000000"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {/* Badge — flat top-left corner, rounded elsewhere, blue with darker border */}
      <div
        style={{
          marginTop: '-2px',
          marginLeft: '9px',
          display: 'inline-block',
          background: '#2B7FFF',
          border: '2px solid #1A60E0',
          borderRadius: '3px 12px 12px 12px',
          padding: '3px 10px',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 500,
          fontFamily: '"Unigeo 32", ui-sans-serif, system-ui, sans-serif',
          whiteSpace: 'nowrap',
          lineHeight: 1.3,
          letterSpacing: '0.01em',
        }}
      >
        {name}
      </div>
    </motion.div>
  )
}
