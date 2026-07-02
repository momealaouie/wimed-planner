function formatPnr(value) {
  const digits = value.replace(/\D/g, '').slice(0, 12)
  if (digits.length <= 8) return digits
  return `${digits.slice(0, 8)}-${digits.slice(8)}`
}

export default function BasicInfoStep({ form, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-stone-400">
          Den avlidne
        </p>
      </div>
      <div>
        <label htmlFor="firstName" className="wimed-label">Förnamn</label>
        <input
          id="firstName"
          type="text"
          className="wimed-input"
          value={form.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName" className="wimed-label">Efternamn</label>
        <input
          id="lastName"
          type="text"
          className="wimed-input"
          value={form.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pnr" className="wimed-label">Personnummer</label>
        <input
          id="pnr"
          type="text"
          inputMode="numeric"
          placeholder="ÅÅÅÅMMDD-XXXX"
          maxLength={13}
          className="wimed-input"
          value={form.pnr}
          onChange={(e) => onChange('pnr', formatPnr(e.target.value))}
        />
      </div>

      <div className="sm:col-span-2 mt-2">
        <p className="mb-1 border-t border-stone-100 pt-4 text-xs font-medium uppercase tracking-wide text-stone-400">
          Beställare (dina uppgifter)
        </p>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contactName" className="wimed-label">För- och efternamn</label>
        <input
          id="contactName"
          type="text"
          autoComplete="name"
          className="wimed-input"
          value={form.contactName}
          onChange={(e) => onChange('contactName', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contactPhone" className="wimed-label">Telefonnummer</label>
        <input
          id="contactPhone"
          type="tel"
          autoComplete="tel"
          className="wimed-input"
          value={form.contactPhone}
          onChange={(e) => onChange('contactPhone', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contactEmail" className="wimed-label">E-postadress</label>
        <input
          id="contactEmail"
          type="email"
          autoComplete="email"
          className="wimed-input"
          value={form.contactEmail}
          onChange={(e) => onChange('contactEmail', e.target.value)}
        />
      </div>
    </div>
  )
}
