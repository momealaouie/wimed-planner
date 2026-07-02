import {
  ArrowLeft,
  ClipboardList,
  User,
  Phone,
  Mail,
  Package,
  CheckSquare,
  ShieldCheck,
  NotebookPen,
} from 'lucide-react'
import { BASE_FEE, CATEGORY_LABELS, findProduct, formatKr } from '../data.js'

function buildChecklist(form, selections, notes) {
  const kista = findProduct('kista', selections.kista)
  const urna = findProduct('urna', selections.urna)
  const blommor = findProduct('blommor', selections.blommor)
  const items = [
    `Ring ${form.contactName || 'beställaren'} inom 24 timmar för att boka personligt möte`,
    'Verifiera den avlidnes personnummer mot folkbokföringen',
  ]
  if (notes && notes.trim()) {
    items.push('Läs igenom kundens anteckningar innan mötet')
  }
  switch (selections.ceremoni) {
    case 'ceremoni-kyrka':
      items.push('Kontakta Svenska kyrkan — boka kyrka, präst och datum')
      break
    case 'ceremoni-kapell':
      items.push('Boka begravningskapell, officiant och musik')
      break
    case 'ceremoni-borgerlig':
      items.push('Boka egen lokal och borgerlig officiant')
      break
    case 'ceremoni-direkt':
      items.push('Planera direktkremation — boka tid med krematoriet')
      break
    default:
      items.push('Ceremonityp ej vald — ta upp vid mötet')
  }
  items.push(
    kista ? `Lägg leverantörsorder: ${kista.title}` : 'Kistval saknas — visa katalog vid mötet',
    urna ? `Lägg leverantörsorder: ${urna.title}` : 'Urnval saknas — visa katalog vid mötet',
    blommor
      ? `Beställ blommor från florist: ${blommor.title}`
      : 'Blomsterval saknas — visa floristens katalog vid mötet',
    'Förbered offert och överlämna prisspecifikation vid mötet'
  )
  return items
}

export default function AdminPortal({ form, selections, notes, total, caseId, submittedAt, onBack }) {
  const checklist = buildChecklist(form, selections, notes)

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Personal-topbar */}
      <header className="border-b border-white/10 bg-brand-dark">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
          <ShieldCheck size={20} className="text-emerald-300" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Wimed Staff Portal
          </span>
          <span className="text-white/20">|</span>
          <span className="text-sm text-white/70">Internt ärendeunderlag</span>
          <button
            type="button"
            onClick={onBack}
            className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white/80 transition hover:bg-white/10"
          >
            <ArrowLeft size={15} />
            Tillbaka till kundvyn
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Digital urkund / clipboard */}
        <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
          <div className="flex flex-wrap items-center gap-3 border-b border-stone-200 bg-stone-50 px-6 py-5 sm:px-8">
            <ClipboardList size={22} className="text-brand" />
            <div>
              <h1 className="font-serif text-xl text-stone-800">Nytt ärende inkommet</h1>
              <p className="text-xs text-stone-500">
                Ärende {caseId} · Mottaget{' '}
                {submittedAt.toLocaleString('sv-SE', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </div>
            <span className="ml-auto rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              Väntar på handläggare
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-2">
            {/* Vänster: kunddata */}
            <div className="space-y-6">
              <section>
                <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
                  <User size={14} /> Den avlidne
                </h2>
                <dl className="space-y-2 rounded-lg border border-stone-200 p-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-stone-500">Namn</dt>
                    <dd className="font-medium text-stone-800">
                      {form.firstName} {form.lastName}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-stone-500">Personnummer</dt>
                    <dd className="font-medium text-stone-800">{form.pnr}</dd>
                  </div>
                </dl>
              </section>

              <section>
                <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
                  <Phone size={14} /> Beställare
                </h2>
                <dl className="space-y-2 rounded-lg border border-stone-200 p-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-stone-500">Namn</dt>
                    <dd className="font-medium text-stone-800">{form.contactName}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-stone-500">Telefon</dt>
                    <dd className="font-medium text-stone-800">{form.contactPhone}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="flex items-center gap-1 text-stone-500">
                      <Mail size={13} /> E-post
                    </dt>
                    <dd className="font-medium text-stone-800">{form.contactEmail}</dd>
                  </div>
                </dl>
              </section>

              <section>
                <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
                  <Package size={14} /> Valda produkter & tjänster
                </h2>
                <ul className="divide-y divide-stone-100 rounded-lg border border-stone-200 text-sm">
                  {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
                    const product = findProduct(category, selections[category])
                    return (
                      <li key={category} className="flex items-baseline justify-between gap-3 px-4 py-3">
                        <span className="text-stone-500">{label}</span>
                        {product ? (
                          <span className="text-right font-medium text-stone-800">
                            {product.title}
                            <span className="ml-1.5 whitespace-nowrap text-stone-500">
                              {formatKr(product.price)}
                            </span>
                          </span>
                        ) : (
                          <span className="italic text-stone-300">Ej valt</span>
                        )}
                      </li>
                    )
                  })}
                  <li className="flex items-baseline justify-between gap-3 px-4 py-3">
                    <span className="text-stone-500">Grundavgift</span>
                    <span className="font-medium text-stone-800">{formatKr(BASE_FEE)}</span>
                  </li>
                  <li className="flex items-baseline justify-between gap-3 bg-brand-tint/60 px-4 py-3">
                    <span className="font-semibold text-brand-dark">Totalt</span>
                    <span className="font-serif text-lg font-bold text-brand-dark">
                      {formatKr(total)}
                    </span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
                  <NotebookPen size={14} /> Kundens anteckningar
                </h2>
                <div className="rounded-lg border border-stone-200 bg-amber-50/50 p-4 text-sm">
                  {notes && notes.trim() ? (
                    <p className="whitespace-pre-wrap leading-relaxed text-stone-700">
                      {notes.trim()}
                    </p>
                  ) : (
                    <p className="italic text-stone-400">Kunden lämnade inga anteckningar.</p>
                  )}
                </div>
              </section>
            </div>

            {/* Höger: genererad checklista */}
            <div>
              <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
                <CheckSquare size={14} /> Checklista inför mötet
              </h2>
              <ol className="space-y-2.5">
                {checklist.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-stone-200 bg-stone-50/60 px-4 py-3 text-sm text-stone-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-stone-300 bg-white text-[10px] font-bold text-stone-400">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs leading-relaxed text-stone-400">
                Checklistan genereras automatiskt utifrån kundens val och är avsedd som
                förberedelse inför det personliga mötet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
