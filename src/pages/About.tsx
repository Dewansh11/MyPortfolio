export default function About() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">About</h2>

      <p className="max-w-3xl text-slate-300">
        Replace this text with your story: how you started, what you enjoy
        building, and the tech you&apos;ve worked with. This layout is set up for
        clear sections and easy editing.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-200">
            What I&apos;m focused on
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>• Building reusable UI components</li>
            <li>• Writing maintainable TypeScript</li>
            <li>• Creating responsive, accessible experiences</li>
            <li>• Shipping performance-minded interfaces</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-200">Tools</h3>
          <p className="mt-4 text-sm text-slate-300">
            React, TypeScript, Tailwind, and modern frontend tooling.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            Add your own skills, certificates, or highlight projects here.
          </p>
        </div>
      </div>
    </section>
  )
}

