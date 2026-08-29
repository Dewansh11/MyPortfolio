export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">
      <div className="mx-auto w-full max-w-6xl">
        <p>
          © {new Date().getFullYear()} Dewansh Saxena. Built with React + Tailwind.
        </p>
      </div>
    </footer>
  )
}
