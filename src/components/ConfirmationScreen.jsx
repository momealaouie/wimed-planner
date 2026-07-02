import { CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react'

export default function ConfirmationScreen({ caseId, contactName, onOpenStaff, onEdit }) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {/* Topbar med Personalvy-knapp till höger */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-400">Wimed</span>
          <span className="text-stone-200">|</span>
          <h1 className="font-serif text-base text-stone-700">Planera begravning</h1>
          <button
            type="button"
            onClick={onOpenStaff}
            className="ml-auto flex items-center gap-2 rounded-lg border border-brand/30 bg-white px-4 py-2 text-sm font-medium text-brand transition hover:bg-brand-tint"
          >
            <ShieldCheck size={16} />
            Personalvy
          </button>
        </div>
      </header>

      {/* Kundbekräftelse */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-xl border border-stone-200 bg-white p-10 text-center shadow-sm sm:p-14">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-tint">
            <CheckCircle2 size={28} className="text-brand" />
          </div>
          <h2 className="font-serif text-2xl text-stone-800">
            Tack{contactName ? `, ${contactName.trim().split(' ')[0]}` : ''} — vi har tagit
            emot ert ärende
          </h2>
          <p className="mx-auto mt-4 max-w-sm leading-relaxed text-stone-600">
            Era uppgifter och er specifikation har sparats. En av våra rådgivare
            ringer upp er inom kort — oftast samma dag — för att i lugn och ro boka
            in ett personligt möte.
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone-500">
            Ni behöver inte göra något mer just nu, och ingenting är bindande
            förrän vi har träffats.
          </p>

          <p className="mt-6 text-xs text-stone-400">Ärendenummer: {caseId}</p>

          <button
            type="button"
            onClick={onEdit}
            className="mx-auto mt-8 flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-brand"
          >
            <ArrowLeft size={15} />
            Tillbaka och ändra era val
          </button>
        </div>
      </main>
    </div>
  )
}
