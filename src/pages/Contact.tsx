import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

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
    <div className="mx-auto max-w-6xl px-4 pb-36 pt-10">
    <section className="content-zone rounded-2xl px-6 py-10 md:px-8">
      <div>
        <p className="figjam-frame-label mb-2">Contact</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Let's work together
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Add your preferred contact options (email/LinkedIn/GitHub). This form
          is a starting point — you can connect it to Formspree, Netlify Forms,
          or your own backend.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Email: yourname@example.com</li>
            <li>LinkedIn: linkedin.com/in/your-handle</li>
            <li>GitHub: github.com/your-handle</li>
          </ul>
          <p className="mt-5 text-sm text-slate-500">
            Replace the placeholders with your real links and email.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition-colors focus:border-slate-400"
                placeholder="Your name"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition-colors focus:border-slate-400"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 min-h-[130px] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition-colors focus:border-slate-400"
                placeholder="Tell me about your project..."
                required
              />
            </label>

            <motion.button
              type="submit"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ y: 2, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Send message
            </motion.button>
          </div>
        </form>
      </div>
    </section>
    </div>
  )
}
