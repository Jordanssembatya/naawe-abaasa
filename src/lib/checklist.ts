import type { MessageKey, Translate } from '../i18n/translator';
import type { InsuranceProduct } from '../types/product';

export interface ChecklistItem {
  id: string;
  title: string;
  detail?: string;
}

interface StandardStep {
  id: string;
  title: MessageKey;
  detail?: MessageKey;
}

/** Standard steps that apply to every product, in order. */
const standardSteps: StandardStep[] = [
  { id: 'review-cover', title: 'enrol.steps.reviewCover.title', detail: 'enrol.steps.reviewCover.detail' },
  { id: 'confirm-eligibility', title: 'enrol.steps.confirmEligibility.title', detail: 'enrol.steps.confirmEligibility.detail' },
  { id: 'confirm-price', title: 'enrol.steps.confirmPrice.title', detail: 'enrol.steps.confirmPrice.detail' },
  { id: 'ask-waiting-docs', title: 'enrol.steps.askWaitingDocs.title' },
  { id: 'get-form', title: 'enrol.steps.getForm.title', detail: 'enrol.steps.getForm.detail' },
  { id: 'confirm-submission', title: 'enrol.steps.confirmSubmission.title', detail: 'enrol.steps.confirmSubmission.detail' },
  { id: 'written-terms', title: 'enrol.steps.writtenTerms.title' },
];

/** The checklist for a product, with text in the language of `t` (pass the product already translated). */
export function buildChecklist(product: InsuranceProduct, t: Translate): ChecklistItem[] {
  const standard = standardSteps.map(({ id, title, detail }) => ({ id, title: t(title), ...(detail ? { detail: t(detail) } : {}) }));
  const extra = (product.enrolmentSteps ?? []).map((title, index) => ({ id: `product-${index}`, title }));
  // Product-specific steps go before the form step, where they are most useful.
  const insertAt = standard.findIndex((s) => s.id === 'get-form');
  return [...standard.slice(0, insertAt), ...extra, ...standard.slice(insertAt)];
}
