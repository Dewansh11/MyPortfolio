import { Link } from 'react-router-dom'

const featured = [
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio with projects, case studies, and contact.',
    tags: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'Dashboard UI',
    description: 'A modern admin/dashboard UI with charts and reusable components.',
    tags: ['React', 'UI', 'Design System'],
  },
]

export default function Home() {
  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300">
            Frontend Developer
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Hi, I&apos;m <span className="text-indigo-400">Your Name</span>
          </h1>
          <p className="mt-4 text-slate-300">
            I build fast, accessible web apps using React and modern UI
            patterns. This is your starting portfolio page—swap in your real
            content and links.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800"
            >
              Contact Me
            </Link>
          </div>
        </div>

        <div className="w-full md:max-w-sm">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-sm font-semibold text-slate-200">
              Quick facts
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>• React + TypeScript</li>
              <li>• Tailwind UI styling</li>
              <li>• Clean, responsive layouts</li>
              <li>• Performance-minded</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <h3 className="text-base font-semibold text-slate-100">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

