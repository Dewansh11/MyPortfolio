export default function Footer() {
  return (
    <footer className="border-t border-slate-800 px-4 py-8 text-center text-sm text-slate-400">
      <div className="mx-auto w-full max-w-6xl">
        <p>
          © {new Date().getFullYear()} Your Name. Built with React + Tailwind.
        </p>
      </div>
    </footer>
  )
}

