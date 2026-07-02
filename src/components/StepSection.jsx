import { ChevronDown } from 'lucide-react'

export default function StepSection({
  number,
  title,
  subtitle,
  done,
  doneLabel,
  open,
  onToggle,
  children,
}) {
  return (
    <section
      className={`overflow-hidden rounded-xl border bg-white shadow-sm transition ${
        open ? 'border-stone-300' : 'border-stone-200'
      }`}
    >
      {/* Klickbar flik-header — öppnar/stänger sektionen */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-6 py-5 text-left transition hover:bg-stone-50"
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
            done ? 'bg-brand text-white' : 'bg-stone-100 text-stone-500'
          }`}
        >
          {number}
        </span>
        <div className="min-w-0">
          <h2 className="font-serif text-lg leading-tight text-stone-800">{title}</h2>
          <p className="mt-0.5 truncate text-xs text-stone-500">
            {done && doneLabel ? doneLabel : subtitle}
          </p>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-3">
          {done && (
            <span className="rounded-full bg-brand-tint px-2.5 py-1 text-xs font-medium text-brand-dark">
              Klart
            </span>
          )}
          <ChevronDown
            size={18}
            className={`text-stone-400 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {open && <div className="border-t border-stone-100 p-6">{children}</div>}
    </section>
  )
}
