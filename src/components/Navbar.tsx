import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Me' },
  { to: '/resume', label: 'Resume' },
]

export default function Navbar() {
  return (
    <header className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <nav
        className="flex h-[90px] items-center rounded-[20px] border border-black/[0.05] px-4"
        style={{
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow:
            '0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)',
          fontFamily: '"Roboto Mono", monospace',
        }}
      >
        {links.map((link, index) => (
          <div key={link.to} className="flex items-center">

            {index > 0 && (
              <div
                className="mx-3 w-px"
                style={{ height: '26px', background: 'rgba(0,0,0,0.06)' }}
              />
            )}

            <NavLink
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }: { isActive: boolean }) =>
                [
                  'rounded-[12px] px-6 py-[14px] text-sm transition-all hover:-translate-y-0.5 active:translate-y-0',
                  isActive
                    ? 'font-semibold text-white bg-[rgba(124,58,237,1)]'
                    : 'font-medium text-[rgba(26,24,20,0.70)] hover:bg-black/[0.04]',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>

          </div>
        ))}
      </nav>
    </header>
  )
}
