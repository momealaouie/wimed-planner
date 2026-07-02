import { FileText } from 'lucide-react'
import { BASE_FEE, CATEGORY_LABELS, findProduct, formatKr } from '../data.js'

export default function SummaryPanel({ selections, total, error, onSubmit }) {
  return (
    <aside className="flex flex-col gap-5 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-tint text-brand-dark">
          <FileText size={18} />
        </div>
        <div>
          <h2 className="font-serif text-lg leading-tight text-stone-800">Din specifikation</h2>
          <p className="mt-0.5 text-xs text-stone-500">Uppdateras i realtid</p>
        </div>
      </div>

      {/* Valda poster */}
      <ul className="space-y-3 border-t border-stone-100 pt-4 text-sm">
        {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
          const product = findProduct(category, selections[category])
          return (
            <li key={category} className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-stone-500">{label}:</span>
              {product ? (
                <span className="text-right font-medium text-stone-800">
                  {product.title}
                  <span className="ml-1.5 whitespace-nowrap text-stone-500">
                    – {formatKr(product.price)}
                  </span>
                </span>
              ) : (
                <span className="italic text-stone-300">Ej valt</span>
              )}
            </li>
          )
        })}
        <li className="flex items-baseline justify-between gap-3 border-t border-stone-100 pt-3">
          <span className="text-stone-500">Grundavgift (byråns arvode):</span>
          <span className="font-medium text-stone-800">{formatKr(BASE_FEE)}</span>
        </li>
      </ul>

      {/* Löpande totalsumma */}
      <div className="flex items-baseline justify-between rounded-lg bg-stone-50 px-4 py-3">
        <span className="text-sm font-medium text-stone-600">Totalt att fakturera</span>
        <span className="font-serif text-xl font-bold text-brand-dark">{formatKr(total)}</span>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <div>
        <button
          type="button"
          onClick={onSubmit}
          className="w-full rounded-lg bg-brand px-6 py-3.5 text-base font-medium text-white transition hover:bg-brand-dark"
        >
          Spara och granska ärende
        </button>
        <p className="mt-3 text-center text-xs text-stone-400">
          Inget är bindande. Priserna är preliminära tills ärendet bekräftats.
        </p>
      </div>
    </aside>
  )
}
