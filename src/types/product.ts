/**
 * Product data model.
 *
 * Convention: `null` always means "not specified in the source data".
 * It never means "none", "zero" or "unlimited". An empty array means the
 * source explicitly lists nothing (e.g. "no waiting periods apply").
 */

export type DataStatus = 'demo' | 'verified';

export type CustomerCategory =
  | 'informal-sector'
  | 'self-employed'
  | 'salaried'
  | 'boda-boda'
  | 'market-vendor'
  | 'small-business';

export type CoverFor = 'individual' | 'family';

export type CoverageKey = 'inpatient' | 'outpatient' | 'maternity' | 'dental' | 'optical';

export type CoverageStatus = 'covered' | 'not-covered' | 'optional-add-on' | 'not-specified';

export interface CoverageArea {
  status: CoverageStatus;
  /** One-line plain-English description of what is included. */
  summary: string | null;
}

export type LimitPeriod = 'per-year' | 'per-admission' | 'per-pregnancy' | 'per-visit' | 'per-night' | 'lifetime';

export interface BenefitLimit {
  label: string;
  /** Amount in Uganda shillings, or null when the amount is not specified. */
  amountUgx: number | null;
  period: LimitPeriod | null;
  notes?: string;
}

export interface WaitingPeriod {
  appliesTo: string;
  /** Human-readable duration, e.g. "30 days". */
  duration: string;
}

export type PremiumFrequency = 'month' | 'quarter' | 'year';

export interface Premium {
  amountUgx: number;
  frequency: PremiumFrequency;
  /** Who the premium covers, e.g. "per person" or "per family of up to 4". */
  basis: string;
  /** True when the figure is a fictional value used for demonstration only. */
  illustrative: boolean;
}

export type ContactChannelType = 'phone' | 'email' | 'website';

export interface ContactChannel {
  type: ContactChannelType;
  label: string;
  value: string;
}

export type ContactRoute =
  | {
      status: 'verified';
      organisation: string;
      channels: ContactChannel[];
      verifiedAt: string;
    }
  | {
      status: 'unverified';
      /** Explains why there is no contact route and how the user can find one. */
      note: string;
    };

export interface InsuranceProduct {
  id: string;
  name: string;
  insurer: string;
  dataStatus: DataStatus;
  tagline: string;
  targetCustomers: CustomerCategory[] | null;
  coverFor: CoverFor[] | null;
  coverageSummary: string;
  coverage: Record<CoverageKey, CoverageArea>;
  coveredServices: string[] | null;
  benefitLimits: BenefitLimit[] | null;
  exclusions: string[] | null;
  waitingPeriods: WaitingPeriod[] | null;
  eligibility: string[] | null;
  premium: Premium | null;
  enrolmentRequirements: string[] | null;
  requiredDocuments: string[] | null;
  /** Product-specific steps added to the standard enrolment checklist. */
  enrolmentSteps: string[] | null;
  contactRoute: ContactRoute;
  /** ISO date when the record was last reviewed, or null if never verified. */
  lastVerifiedAt: string | null;
  sourceNotes: string;
}
