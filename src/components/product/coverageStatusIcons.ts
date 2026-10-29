import { CircleCheck, CircleDashed, CircleHelp, CircleX, type LucideIcon } from 'lucide-react';
import type { CoverageStatus } from '../../types/product';

export const coverageStatusIcons: Record<CoverageStatus, LucideIcon> = {
  covered: CircleCheck,
  'not-covered': CircleX,
  'optional-add-on': CircleDashed,
  'not-specified': CircleHelp,
};
