import { useState } from 'react'
import { Lock, NotebookPen } from 'lucide-react'
import { BASE_FEE, CATALOG, findProduct } from './data.js'
import StepSection from './components/StepSection.jsx'
import BasicInfoStep from './components/BasicInfoStep.jsx'
import ProductCard from './components/ProductCard.jsx'
import SummaryPanel from './components/SummaryPanel.jsx'
import AdminPortal from './components/AdminPortal.jsx'
import ConfirmationScreen from './components/ConfirmationScreen.jsx'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  pnr: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
}

const INITIAL_SELECTIONS = { kista: null, urna: null, ceremoni: null, blommor: null }

const PRODUCT_SECTIONS = [
  {
    key: 'kista',
    number: '2',
    title: 'Kistor',
    subtitle: 'Tryck för att se hela sortimentet av kistor',
  },
  {
    key: 'urna',
    number: '3',
    title: 'Urnor',
    subtitle: 'Vid kremering — askan gravsätts i urnan. Tryck för att välja.',
  },
  {
    key: 'ceremoni',
    number: '4',
    title: 'Ceremoni',
    subtitle: 'Tryck för att välja hur avskedet ska utformas',
  },
  {
    key: 'blommor',
    number: '5',
    title: 'Blommor',
    subtitle: 'Kistdekorationer, kransar och buketter. Tryck för att välja.',
  },
]

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [selections, setSelections] = useState(INITIAL_SELECTIONS)
  const [notes, setNotes] = useState('')
  const [openSection, setOpenSection] = useState('info')
  const [view, setView] = useState('planner') // 'planner' | 'confirmation' | 'admin'
  const [submittedAt, setSubmittedAt] = useState(null)
  const [error, setError] = useState('')

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  // Flik-beteende: en sektion i taget är öppen; klick på samma stänger den.
  const toggleSection = (key) => setOpenSection((prev) => (prev === key ? null : key))

  // Klick på "Välj" — samma knapp avmarkerar om kortet redan är valt.
  const toggleSelection = (category, id) =>
    setSelections((prev) => ({ ...prev, [category]: prev[category] === id ? null : id }))

  const total =
    BASE_FEE +
    Object.keys(INITIAL_SELECTIONS).reduce(
      (sum, category) => sum + (findProduct(category, selections[category])?.price || 0),
      0
    )

  const basicDone =
    form.firstName.trim() &&
    form.lastName.trim() &&
    /^\d{8}-\d{4}$/.test(form.pnr.trim()) &&
    form.contactName.trim() &&
    form.contactPhone.trim() &&
    form.contactEmail.trim()

  const caseId = submittedAt ? 'WM-' + submittedAt.getTime().toString().slice(-6) : null

  function handleSubmit() {
    setError('')
    if (!form.firstName.trim() || !form.lastName.trim() || !form.pnr.trim()) {
      setOpenSection('info')
      return setError('Fyll i uppgifterna om den avlidne under steg 1.')
    }
    if (!/^\d{8}-\d{4}$/.test(form.pnr.trim())) {
      setOpenSection('info')
      return setError('Personnummer ska ha formatet ÅÅÅÅMMDD-XXXX.')
    }
    if (!form.contactName.trim() || !form.contactPhone.trim() || !form.contactEmail.trim()) {
      setOpenSection('info')
      return setError('Fyll i beställarens kontaktuppgifter under steg 1.')
    }
    const phoneDigits = form.contactPhone.replace(/[\s\-().+]/g, '')
    if (!/^\d{7,15}$/.test(phoneDigits)) {
      setOpenSection('info')
      return setError('Ange ett giltigt telefonnummer.')
    }
    if (!/^\S+@\S+\.\S+$/.test(form.contactEmail.trim())) {
      setOpenSection('info')
      return setError('Ange en giltig e-postadress (måste innehålla @).')
    }

    setSubmittedAt(new Date())
    setView('confirmation')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Personalens Admin-portal — nås via "Personalvy"-knappen på bekräftelsesidan.
  if (view === 'admin') {
    return (
      <AdminPortal
        form={form}
        selections={selections}
        notes={notes}
        total={total}
        caseId={caseId}
        submittedAt={submittedAt}
        onBack={() => setView('confirmation')}
      />
    )
  }

  // Kundens bekräftelsesida efter inskickat ärende.
  if (view === 'confirmation') {
    return (
      <ConfirmationScreen
        caseId={caseId}
        contactName={form.contactName}
        onOpenStaff={() => setView('admin')}
        onEdit={() => setView('planner')}
      />
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {/* Topbar */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-400">Wimed</span>
          <span className="text-stone-200">|</span>
          <h1 className="font-serif text-base text-stone-700">Planera begravning</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-7 max-w-2xl">
          <h2 className="font-serif text-2xl text-stone-800">Skapa er specifikation</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            Öppna en kategori i taget och välj i lugn takt. Sammanställningen till
            höger uppdateras löpande, och inget är bindande förrän vi träffats
            personligen.
          </p>
        </div>

        {/* Tvåkolumns-arbetsyta: 70 % katalog / 30 % sticky specifikation */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[7fr_3fr] lg:gap-8">
          {/* Vänster: hopfällbara kategoriflikar */}
          <div className="space-y-4">
            <StepSection
              number="1"
              title="Grunduppgifter"
              subtitle="Den avlidne och beställarens kontaktuppgifter"
              done={Boolean(basicDone)}
              doneLabel={`${form.firstName} ${form.lastName} · Beställare: ${form.contactName}`}
              open={openSection === 'info'}
              onToggle={() => toggleSection('info')}
            >
              <BasicInfoStep form={form} onChange={updateForm} />
            </StepSection>

            {PRODUCT_SECTIONS.map(({ key, number, title, subtitle }) => {
              const chosen = findProduct(key, selections[key])
              return (
                <StepSection
                  key={key}
                  number={number}
                  title={title}
                  subtitle={subtitle}
                  done={Boolean(chosen)}
                  doneLabel={chosen ? `Valt: ${chosen.title}` : undefined}
                  open={openSection === key}
                  onToggle={() => toggleSection(key)}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {CATALOG[key].map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        selected={selections[key] === product.id}
                        onSelect={() => toggleSelection(key, product.id)}
                      />
                    ))}
                  </div>
                </StepSection>
              )
            })}

            {/* Anteckningar — fritext längst ner */}
            <section className="rounded-xl border border-stone-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-stone-100 px-6 pb-4 pt-6">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                    notes.trim() ? 'bg-brand text-white' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  <NotebookPen size={17} />
                </span>
                <div>
                  <h2 className="font-serif text-lg leading-tight text-stone-800">
                    Anteckningar
                  </h2>
                  <p className="mt-0.5 text-xs text-stone-500">
                    Egna önskemål, frågor eller annat vi bör känna till inför mötet
                  </p>
                </div>
              </div>
              <div className="p-6">
                <textarea
                  rows={4}
                  className="wimed-input resize-y"
                  placeholder="T.ex. önskemål om musik, psalmer, klädsel, minnesstund eller frågor ni vill ta upp…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </section>
          </div>

          {/* Höger: sticky live-specifikation */}
          <div className="lg:sticky lg:top-8">
            <SummaryPanel
              selections={selections}
              total={total}
              error={error}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>

      {/* Bottendockad diskret personalrad */}
      <footer className="border-t border-stone-200 bg-white/80">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:px-6">
          <Lock size={13} className="text-stone-300" />
          <span className="text-xs text-stone-400">
            Wimed Staff Portal — nås via Personalvy när ärendet sparats
          </span>
        </div>
      </footer>
    </div>
  )
}
