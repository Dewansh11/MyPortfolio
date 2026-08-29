const PROCESS_BLOBS = [
  {
    className:
      'absolute top-[-8%] right-[8%] h-[460px] w-[460px] rounded-full bg-orange-400/10 blur-[110px]',
  },
  {
    className:
      'absolute bottom-[-12%] left-[15%] h-[360px] w-[360px] rounded-full bg-amber-300/15 blur-[100px]',
  },
] as const

export default function SectionBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="section-atmosphere-process pointer-events-none absolute inset-0 overflow-hidden"
    >
      {PROCESS_BLOBS.map((blob, i) => (
        <div key={i} className={blob.className} />
      ))}
    </div>
  )
}
