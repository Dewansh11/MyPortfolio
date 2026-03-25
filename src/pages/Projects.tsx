const projects = [
  {
    name: 'Project One',
    summary: 'What the project does and why it matters.',
    stack: ['React', 'TypeScript'],
  },
  {
    name: 'Project Two',
    summary: 'A short description to show impact and complexity.',
    stack: ['React', 'Tailwind'],
  },
  {
    name: 'Project Three',
    summary: 'Highlights: UX, performance, and thoughtful UI patterns.',
    stack: ['UI', 'Accessibility'],
  },
  {
    name: 'Project Four',
    summary: 'Optional: include links to GitHub/live demo later.',
    stack: ['Design System', 'Components'],
  },
]

export default function Projects() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
      <p className="max-w-3xl text-slate-300">
        Add your real project cards here. This grid is ready for links, tech
        tags, and short “what I built” summaries.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <h3 className="text-base font-semibold text-slate-100">
              {project.name}
            </h3>
            <p className="mt-2 text-sm text-slate-300">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

