export interface GlossaryEntry {
  id: string;
  term: string;
  /** One-sentence definition used in popovers. */
  short: string;
  /** Longer explanation for the glossary page. */
  detail: string;
  example?: string;
  related?: string[];
}

export const glossary: GlossaryEntry[] = [
  {
    id: 'premium',
    term: 'Premium',
    short: 'The amount you pay the insurer, usually every month or year, to keep your cover active.',
    detail:
      'If you stop paying the premium, your cover usually stops too. Ask how and when payments are due and what happens if a payment is late.',
    example: 'Paying UGX 25,000 every month for health cover.',
    related: ['benefit-limit'],
  },
  {
    id: 'benefit-limit',
    term: 'Benefit limit',
    short: 'The most the insurer will pay for a type of care within a set period, such as a year.',
    detail:
      'Once the limit is used up, you pay any further costs yourself until the period restarts. Limits can apply to the whole policy, to one type of care, or to each visit or night in hospital.',
    example: 'An inpatient limit of UGX 5,000,000 per year means the insurer stops paying after that amount in one year.',
    related: ['inpatient', 'outpatient', 'co-payment'],
  },
  {
    id: 'exclusion',
    term: 'Exclusion',
    short: 'Something the policy does not pay for, even if you need it.',
    detail:
      'Always read the exclusions before choosing a product. A missing exclusion list in summary information does not mean there are no exclusions; the full policy document will have them.',
    example: 'Cosmetic surgery is a common exclusion.',
    related: ['pre-existing-condition'],
  },
  {
    id: 'waiting-period',
    term: 'Waiting period',
    short: 'Time after joining before you can use some or all of the cover.',
    detail:
      'During a waiting period you pay premiums but cannot claim for the affected care. Maternity and pre-existing conditions often have long waiting periods. Accidents often have none.',
    example: 'A 10-month waiting period for maternity means you cannot claim for a delivery in the first 10 months.',
    related: ['pre-existing-condition'],
  },
  {
    id: 'co-payment',
    term: 'Co-payment',
    short: 'A fixed amount or share of the bill that you pay yourself each time you use the cover.',
    detail:
      'The insurer pays the rest of the bill, up to the benefit limit. Co-payments help keep premiums lower.',
    example: 'Paying UGX 5,000 at each clinic visit while the insurer pays the remainder.',
    related: ['deductible', 'benefit-limit'],
  },
  {
    id: 'deductible',
    term: 'Deductible (excess)',
    short: 'An amount you must pay yourself before the insurer starts paying a claim.',
    detail:
      'Some policies apply a deductible once a year; others apply it to each claim. Ask which applies and how much it is.',
    example: 'With a UGX 100,000 excess on a UGX 400,000 bill, you pay 100,000 and the insurer pays 300,000.',
    related: ['co-payment'],
  },
  {
    id: 'inpatient',
    term: 'Inpatient',
    short: 'Care you receive while admitted and staying in hospital, usually overnight.',
    detail:
      'Includes the bed, surgery, medicines and tests given during the admission. Inpatient bills are often the largest health costs a household faces.',
    related: ['outpatient', 'benefit-limit'],
  },
  {
    id: 'outpatient',
    term: 'Outpatient',
    short: 'Care where you visit a clinic or hospital and go home the same day.',
    detail:
      'Includes consultations, lab tests and prescribed medicines. Some low-cost products do not include outpatient cover at all.',
    related: ['inpatient', 'co-payment'],
  },
  {
    id: 'pre-existing-condition',
    term: 'Pre-existing condition',
    short: 'A health condition you already had, or had symptoms of, before you joined the policy.',
    detail:
      'Insurers often exclude these or apply a waiting period. Answer the insurer’s health questions honestly on their official form; giving wrong information can lead to claims being refused.',
    example: 'Diabetes or high blood pressure diagnosed before you joined.',
    related: ['waiting-period', 'exclusion'],
  },
  {
    id: 'dependants',
    term: 'Dependants',
    short: 'Family members covered under your policy, such as a spouse or children.',
    detail:
      'Insurers set rules on who counts as a dependant, including age limits for children. Each dependant may increase the premium.',
    related: ['premium'],
  },
  {
    id: 'principal-member',
    term: 'Principal member',
    short: 'The main person who takes out the policy and is responsible for paying the premium.',
    detail: 'Dependants are added under the principal member’s policy.',
    related: ['dependants'],
  },
  {
    id: 'intermediary',
    term: 'Authorised intermediary',
    short: 'A licensed agent or broker who is allowed to sell or explain insurance on an insurer’s behalf.',
    detail:
      'In Uganda, insurance agents and brokers are licensed by the insurance regulator. Ask to see proof of a licence before handing over money or documents.',
  },
];

const byId = new Map(glossary.map((entry) => [entry.id, entry]));

export function getGlossaryEntry(id: string): GlossaryEntry | undefined {
  return byId.get(id);
}
