import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  /** Extra content under the lead, such as a badge row or actions. */
  aside?: ReactNode;
}

/** Top band of an inner page, in the same style as section headers. */
export function PageHeader({ eyebrow, title, children, aside }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-header__title">{title}</h1>
        {children && <div className="page-header__lead">{children}</div>}
        {aside}
      </div>
    </div>
  );
}
