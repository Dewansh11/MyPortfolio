import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import BrutalistButton from './BrutalistButton'

export default function SiteHeader() {
  const navigate = useNavigate()

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b-2 border-black bg-white/95 shadow-[0_4px_0_0_rgba(0,0,0,1)] backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link
          to="/"
          aria-label="Dewansh UX — Home"
          className="group flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <img
            src="/logo-mark.png"
            alt="Dewansh UX"
            className="h-9 w-9 object-contain motion-safe:transition-transform group-hover:scale-105 sm:h-10 sm:w-10"
            draggable={false}
          />
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="relative hidden sm:inline-block">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 translate-x-1 translate-y-1 rounded-full border-2 border-zinc-700 bg-zinc-700"
            />
            <Link
              to="/contact"
              className="relative z-10 inline-block rounded-full border-2 border-zinc-700 bg-white px-4 py-2 font-mono text-xs font-bold tracking-wide text-zinc-700 motion-safe:transition-transform motion-reduce:transition-none hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Contact
            </Link>
          </div>

          <BrutalistButton
            onClick={() => navigate('/projects')}
            className="px-4 py-2 text-xs"
          >
            See My Work
          </BrutalistButton>
        </div>
      </div>
    </motion.header>
  )
}
