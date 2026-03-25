import { useState, type FormEvent } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()

    // Demo behavior: wire this to an email service or backend later.
    alert(`Thanks ${name || 'there'}! Your message was sent (demo).`)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
        <p className="mt-2 max-w-3xl text-slate-300">
          Add your preferred contact options (email/LinkedIn/GitHub). This form
          is a starting point—you can connect it to Formspree, Netlify Forms,
          or your own backend.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-200">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>• Email: yourname@example.com</li>
            <li>• LinkedIn: linkedin.com/in/your-handle</li>
            <li>• GitHub: github.com/your-handle</li>
          </ul>
          <p className="mt-5 text-sm text-slate-300">
            Tip: Replace the placeholders with your real links and email.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-200">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
                placeholder="Your name"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-200">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-200">
                Message
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 min-h-[130px] w-full resize-y rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
                placeholder="Tell me about your project..."
                required
              />
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

