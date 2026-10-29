import type { InsuranceProduct } from '../types/product';

export interface ChecklistItem {
  id: string;
  title: string;
  detail?: string;
}

/** Standard steps that apply to every product, in order. */
const standardSteps: ChecklistItem[] = [
  {
    id: 'review-cover',
    title: 'Review what is covered and what is excluded',
    detail: 'Read the coverage, benefit limits and exclusions on the product page.',
  },
  {
    id: 'confirm-eligibility',
    title: 'Confirm you are eligible',
    detail: 'Ask the insurer or a licensed agent or broker whether you and any dependants qualify.',
  },
  {
    id: 'confirm-price',
    title: 'Confirm the current premium, payment options and benefit limits',
    detail: 'Prices and limits can change. Get the current figures from the insurer.',
  },
  {
    id: 'ask-waiting-docs',
    title: 'Ask about waiting periods and the documents you need',
  },
  {
    id: 'get-form',
    title: 'Get the official application form from the insurer or a licensed intermediary',
    detail: 'Fill it in yourself and answer the health questions honestly.',
  },
  {
    id: 'confirm-submission',
    title: 'Confirm how to submit your documents and payment',
    detail: 'Only pay through channels the insurer confirms in writing.',
  },
  {
    id: 'written-terms',
    title: 'Ask for the policy terms in writing before you commit',
  },
];

export function buildChecklist(product: InsuranceProduct): ChecklistItem[] {
  const extra = (product.enrolmentSteps ?? []).map((title, index) => ({ id: `product-${index}`, title }));
  // Product-specific steps go before the form step, where they are most useful.
  const insertAt = standardSteps.findIndex((s) => s.id === 'get-form');
  return [...standardSteps.slice(0, insertAt), ...extra, ...standardSteps.slice(insertAt)];
}
