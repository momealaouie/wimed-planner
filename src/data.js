// Lokal "databas" — hårdkodad mock-data enligt spec.
export const BASE_FEE = 12500

export const COFFINS = [
  {
    id: 'kista-furu',
    title: 'Kista Klassisk, furu',
    price: 9395,
    tag: 'Miljökista',
    desc: 'Traditionell kista i massiv svensk furu med naturlig yta.',
  },
  {
    id: 'kista-vit',
    title: 'Kista Klassisk, vitmålad',
    price: 8595,
    tag: null,
    desc: 'Vitmålad spånkista med enkel, stilren profil.',
  },
  {
    id: 'kista-bjork',
    title: 'Kista Klassisk, björk',
    price: 11295,
    tag: null,
    desc: 'Ljus björkkista med mjukt rundade kanter.',
  },
  {
    id: 'kista-lin',
    title: 'Kista Natur, linneklädd',
    price: 13900,
    tag: 'Miljökista',
    desc: 'Miljöcertifierad kista klädd i naturlinne, helt nedbrytbar.',
  },
  {
    id: 'kista-ek',
    title: 'Kista Klassisk, oljad ek',
    price: 18495,
    tag: 'Exklusiv',
    desc: 'Handbyggd kista i oljad ek med diskreta mässingsdetaljer.',
  },
  {
    id: 'kista-mahogny',
    title: 'Kista Exklusiv, mahogny',
    price: 24995,
    tag: 'Exklusiv',
    desc: 'Mörk mahognykista med handpolerad yta och sidenklädd interiör.',
  },
]

export const URNS = [
  {
    id: 'urna-miljo',
    title: 'Urna Miljö, nedbrytbar',
    price: 1995,
    tag: 'Miljöurna',
    desc: 'Nedbrytbar urna av naturfiber, för gravsättning i minneslund.',
  },
  {
    id: 'urna-vit',
    title: 'Urna Klassisk, vit',
    price: 2495,
    tag: null,
    desc: 'Stilren vit urna i klassiskt utförande.',
  },
  {
    id: 'urna-tra',
    title: 'Urna Trä, ask',
    price: 2895,
    tag: null,
    desc: 'Svarvad träurna i ljus ask med naturlig ådring.',
  },
  {
    id: 'urna-massing',
    title: 'Urna Klassisk, mässing',
    price: 3695,
    tag: null,
    desc: 'Traditionell mässingsurna med graverbar yta.',
  },
  {
    id: 'urna-keramik',
    title: 'Urna Design, handgjord keramik',
    price: 4895,
    tag: 'Exklusiv',
    desc: 'Handdrejad keramikurna, unik glasyr för varje exemplar.',
  },
]

export const CEREMONIES = [
  {
    id: 'ceremoni-kyrka',
    title: 'Kyrklig begravning (Svenska Kyrkan)',
    price: 0,
    tag: 'Ingår',
    desc: 'Ceremoni i kyrka med präst. Kostnaden täcks av kyrkoavgiften.',
  },
  {
    id: 'ceremoni-kapell',
    title: 'Ceremoni i begravningskapell',
    price: 1800,
    tag: null,
    desc: 'Avsked i kapell, med valfri officiant och egen musik.',
  },
  {
    id: 'ceremoni-borgerlig',
    title: 'Borgerlig begravning (Egen lokal)',
    price: 3500,
    tag: null,
    desc: 'Fri ceremoni utan religiösa inslag, i vald lokal med officiant.',
  },
  {
    id: 'ceremoni-direkt',
    title: 'Direktkremation (utan ceremoni)',
    price: 0,
    tag: null,
    desc: 'Kremation utan föregående ceremoni. Avsked kan ske separat.',
  },
]

export const FLOWERS = [
  {
    id: 'blommor-bukett',
    title: 'Handbukett, vit lilja',
    price: 495,
    tag: null,
    desc: 'Enkel handbunden bukett att lägga på kistan.',
  },
  {
    id: 'blommor-krans',
    title: 'Begravningskrans med band',
    price: 1595,
    tag: null,
    desc: 'Klassisk krans med textband och personlig hälsning.',
  },
  {
    id: 'blommor-kistdekoration',
    title: 'Kistdekoration, säsongens blommor',
    price: 1895,
    tag: 'Populär',
    desc: 'Florist väljer säsongens vackraste snittblommor.',
  },
  {
    id: 'blommor-rosor',
    title: 'Kistdekoration, röda rosor',
    price: 2495,
    tag: null,
    desc: 'Praktfull dekoration med röda rosor och grönt.',
  },
  {
    id: 'blommor-hjarta',
    title: 'Blomsterhjärta, rosa & vitt',
    price: 2895,
    tag: null,
    desc: 'Hjärtformad dekoration i rosa och vita toner.',
  },
]

export const CATALOG = {
  kista: COFFINS,
  urna: URNS,
  ceremoni: CEREMONIES,
  blommor: FLOWERS,
}

export const CATEGORY_LABELS = {
  kista: 'Kista',
  urna: 'Urna',
  ceremoni: 'Ceremoni',
  blommor: 'Blommor',
}

export function formatKr(amount) {
  return amount.toLocaleString('sv-SE').replace(/ /g, ' ') + ' kr'
}

export function findProduct(category, id) {
  if (!id) return null
  return CATALOG[category].find((p) => p.id === id) || null
}
