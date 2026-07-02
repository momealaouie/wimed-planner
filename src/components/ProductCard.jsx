import { Check, ImageIcon } from 'lucide-react'
import { formatKr } from '../data.js'

export default function ProductCard({ product, selected, onSelect }) {
  const { title, price, tag, desc } = product

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-200 ${
        selected ? 'border-brand ring-2 ring-brand/20' : 'border-stone-200 hover:border-stone-300'
      }`}
    >
      {/* Bildplatta (placeholder) */}
      <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
        <ImageIcon size={32} className="text-stone-400" />
        {tag && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-tint px-2.5 py-1 text-xs font-medium text-brand-dark">
            {tag}
          </span>
        )}
        {selected && (
          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white shadow">
            <Check size={16} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-serif text-base leading-snug text-stone-800">{title}</h3>
        <p className="text-xs leading-relaxed text-stone-500">{desc}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span
            className={`rounded-md px-2.5 py-1 text-sm font-semibold ${
              price === 0 ? 'bg-brand-tint text-brand-dark' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {price === 0 ? '0 kr' : formatKr(price)}
          </span>
          <button
            type="button"
            onClick={onSelect}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              selected
                ? 'bg-brand text-white hover:bg-brand-dark'
                : 'border border-brand/30 bg-white text-brand hover:bg-brand-tint'
            }`}
          >
            {selected ? 'Vald' : 'Välj'}
          </button>
        </div>
      </div>
    </div>
  )
}
