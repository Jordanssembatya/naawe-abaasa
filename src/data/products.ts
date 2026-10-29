import type { ContactRoute, InsuranceProduct } from '../types/product';

/*
 * DEMONSTRATION DATA ONLY.
 *
 * Every product, insurer and figure below is fictional. The insurer names are
 * deliberately generic so they cannot be mistaken for real Ugandan insurers.
 * Replace these records with verified source data before any real use.
 */

const DEMO_SOURCE_NOTE =
  'Fictional record created for the AfyaGuide prototype. It does not describe a real product, and all amounts are illustrative.';

const UNVERIFIED_CONTACT: ContactRoute = {
  status: 'unverified',
  note: 'This is a fictional demonstration product, so there is no real insurer to contact. For a real product, get the contact details from the insurer’s official channels or from a licensed insurance agent or broker.',
};

export const products: InsuranceProduct[] = [
  {
    id: 'boda-inpatient-basic',
    name: 'Boda Inpatient Basic',
    insurer: 'Demo Insurer A (fictional)',
    dataStatus: 'demo',
    tagline: 'Low-cost hospital cover for riders who mainly need protection from large admission bills.',
    targetCustomers: ['boda-boda', 'informal-sector', 'self-employed'],
    coverFor: ['individual'],
    coverageSummary:
      'Pays for hospital admission (inpatient care) up to a yearly limit. It does not pay for clinic visits where you go home the same day.',
    coverage: {
      inpatient: { status: 'covered', summary: 'Admission, ward bed, surgery, medicines given in hospital.' },
      outpatient: { status: 'not-covered', summary: 'Clinic visits and prescriptions are not included.' },
      maternity: { status: 'not-covered', summary: null },
      dental: { status: 'not-covered', summary: null },
      optical: { status: 'not-covered', summary: null },
    },
    coveredServices: [
      'Hospital admission in a general ward',
      'Surgery performed during admission',
      'Medicines and tests given while admitted',
      'Emergency treatment that leads to admission',
    ],
    benefitLimits: [
      { label: 'Total inpatient cover', amountUgx: 5_000_000, period: 'per-year' },
      { label: 'Ward bed', amountUgx: 80_000, period: 'per-night' },
    ],
    exclusions: [
      'Outpatient (clinic) visits and medicines bought for home use',
      'Injuries while riding without a valid riding permit',
      'Conditions you already had before joining, during the first year',
      'Cosmetic procedures',
    ],
    waitingPeriods: [
      { appliesTo: 'Illness-related admission', duration: '30 days' },
      { appliesTo: 'Pre-existing conditions', duration: '12 months' },
      { appliesTo: 'Accidents', duration: 'No waiting period' },
    ],
    eligibility: ['Aged 18 to 60 years', 'Holds a valid riding permit (for riders)'],
    premium: { amountUgx: 25_000, frequency: 'month', basis: 'per person', illustrative: true },
    enrolmentRequirements: [
      'Complete the insurer’s official application form',
      'Pay the first premium through an approved channel',
    ],
    requiredDocuments: ['National ID', 'Riding permit (if a rider)', 'One passport photo'],
    enrolmentSteps: ['Ask whether your boda stage or SACCO has a group scheme with better terms.'],
    contactRoute: UNVERIFIED_CONTACT,
    lastVerifiedAt: null,
    sourceNotes: DEMO_SOURCE_NOTE,
  },
  {
    id: 'family-starter',
    name: 'Family Starter Cover',
    insurer: 'Demo Insurer B (fictional)',
    dataStatus: 'demo',
    tagline: 'Shared inpatient and outpatient cover for a household, with maternity included.',
    targetCustomers: ['salaried', 'small-business', 'self-employed'],
    coverFor: ['family'],
    coverageSummary:
      'Covers a family of up to four people for hospital admissions and clinic visits, with a shared yearly limit. Includes maternity after a waiting period.',
    coverage: {
      inpatient: { status: 'covered', summary: 'Admission, surgery and medicines while admitted.' },
      outpatient: { status: 'covered', summary: 'Clinic consultations, lab tests and prescribed medicines.' },
      maternity: { status: 'covered', summary: 'Antenatal visits and normal or caesarean delivery.' },
      dental: { status: 'optional-add-on', summary: 'Available at an extra cost.' },
      optical: { status: 'not-covered', summary: null },
    },
    coveredServices: [
      'Hospital admission and surgery',
      'Clinic consultations and lab tests',
      'Prescribed medicines',
      'Antenatal care and delivery',
      'Childhood immunisations not provided free by government',
    ],
    benefitLimits: [
      { label: 'Inpatient cover (shared by the family)', amountUgx: 15_000_000, period: 'per-year' },
      { label: 'Outpatient cover (shared by the family)', amountUgx: 2_000_000, period: 'per-year' },
      { label: 'Maternity', amountUgx: 2_500_000, period: 'per-pregnancy' },
    ],
    exclusions: [
      'Fertility treatment',
      'Cosmetic surgery',
      'Treatment outside the insurer’s approved hospitals, except emergencies',
      'Pre-existing conditions during the first 12 months',
    ],
    waitingPeriods: [
      { appliesTo: 'General illness', duration: '30 days' },
      { appliesTo: 'Maternity', duration: '10 months' },
      { appliesTo: 'Pre-existing conditions', duration: '12 months' },
    ],
    eligibility: [
      'Principal member aged 18 to 65 years',
      'Children up to 18 years, or 25 if in full-time education',
    ],
    premium: { amountUgx: 1_800_000, frequency: 'year', basis: 'per family of up to 4', illustrative: true },
    enrolmentRequirements: [
      'Complete the official application form for every family member',
      'Declare existing medical conditions on the insurer’s form',
      'Pay the first premium through an approved channel',
    ],
    requiredDocuments: [
      'National ID for adults',
      'Birth certificates for children',
      'Passport photos for each member',
    ],
    enrolmentSteps: ['Confirm which hospitals near you are on the insurer’s approved list.'],
    contactRoute: UNVERIFIED_CONTACT,
    lastVerifiedAt: null,
    sourceNotes: DEMO_SOURCE_NOTE,
  },
  {
    id: 'vendor-outpatient-plus',
    name: 'Vendor Outpatient Plus',
    insurer: 'Demo Insurer C (fictional)',
    dataStatus: 'demo',
    tagline: 'Everyday clinic cover for traders, paid in small amounts each week or month.',
    targetCustomers: ['market-vendor', 'informal-sector', 'self-employed'],
    coverFor: ['individual', 'family'],
    coverageSummary:
      'Mainly pays for clinic visits and medicines. Hospital admission is covered only up to a small amount, so a long stay could leave you paying the rest.',
    coverage: {
      inpatient: { status: 'covered', summary: 'Limited cover for short admissions only.' },
      outpatient: { status: 'covered', summary: 'Consultations, basic lab tests and generic medicines.' },
      maternity: { status: 'not-specified', summary: null },
      dental: { status: 'covered', summary: 'Check-ups and extractions only.' },
      optical: { status: 'covered', summary: 'One eye test per year.' },
    },
    coveredServices: [
      'Clinic consultations',
      'Basic lab tests',
      'Generic prescribed medicines',
      'Short hospital admissions',
      'Dental check-ups and extractions',
      'One eye test per year',
    ],
    benefitLimits: [
      { label: 'Outpatient cover', amountUgx: 1_200_000, period: 'per-year' },
      { label: 'Inpatient cover', amountUgx: 1_000_000, period: 'per-year' },
      { label: 'Dental', amountUgx: 200_000, period: 'per-year' },
      { label: 'Co-payment per clinic visit', amountUgx: 5_000, period: 'per-visit', notes: 'You pay this amount each time you visit.' },
    ],
    exclusions: [
      'Branded medicines where a generic version exists',
      'Spectacles and contact lenses',
      'Chronic disease management beyond basic consultations',
    ],
    waitingPeriods: null,
    eligibility: ['Aged 18 to 70 years'],
    premium: { amountUgx: 12_000, frequency: 'month', basis: 'per person', illustrative: true },
    enrolmentRequirements: ['Complete the official application form'],
    requiredDocuments: null,
    enrolmentSteps: [
      'Ask whether you can pay weekly through mobile money, and get the official payment instructions in writing.',
    ],
    contactRoute: UNVERIFIED_CONTACT,
    lastVerifiedAt: null,
    sourceNotes: DEMO_SOURCE_NOTE,
  },
  {
    id: 'salaried-comprehensive',
    name: 'Salaried Comprehensive',
    insurer: 'Demo Insurer D (fictional)',
    dataStatus: 'demo',
    tagline: 'Broad individual cover for people with a regular income. Several details are not yet available.',
    targetCustomers: ['salaried'],
    coverFor: ['individual'],
    coverageSummary:
      'Covers admissions, clinic visits, maternity, dental and optical care. The price and some conditions are not given in the demonstration data, so you would need to ask the insurer.',
    coverage: {
      inpatient: { status: 'covered', summary: 'Admission, surgery, ICU and specialist care.' },
      outpatient: { status: 'covered', summary: 'Consultations, specialists, tests and medicines.' },
      maternity: { status: 'covered', summary: null },
      dental: { status: 'covered', summary: null },
      optical: { status: 'covered', summary: 'Eye tests and one pair of spectacles every two years.' },
    },
    coveredServices: [
      'Hospital admission, surgery and intensive care',
      'Specialist consultations',
      'Lab tests and imaging',
      'Prescribed medicines',
      'Maternity care',
      'Dental and optical care',
    ],
    benefitLimits: [
      { label: 'Inpatient cover', amountUgx: 30_000_000, period: 'per-year' },
      { label: 'Outpatient cover', amountUgx: null, period: 'per-year' },
      { label: 'Maternity', amountUgx: null, period: null },
    ],
    exclusions: null,
    waitingPeriods: [{ appliesTo: 'Maternity', duration: '12 months' }],
    eligibility: null,
    premium: null,
    enrolmentRequirements: null,
    requiredDocuments: null,
    enrolmentSteps: null,
    contactRoute: UNVERIFIED_CONTACT,
    lastVerifiedAt: null,
    sourceNotes:
      DEMO_SOURCE_NOTE + ' This record is intentionally incomplete to show how missing information is displayed.',
  },
];

export function getProductById(id: string): InsuranceProduct | undefined {
  return products.find((p) => p.id === id);
}
