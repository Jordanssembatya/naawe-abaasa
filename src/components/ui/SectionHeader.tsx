import type { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: 'center' | 'start';
  /** Heading level; pages pass 1 for their top heading. */
  level?: 1 | 2;
  id?: string;
  inverted?: boolean;
}

export function SectionHeader({ eyebrow, title, children, align = 'center', level = 2, id, inverted }: SectionHeaderProps) {
  const Heading = level === 1 ? 'h1' : 'h2';
  return (
    <div className={`section-header section-header--${align}${inverted ? ' section-header--inverted' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading id={id} className="section-header__title">
        {title}
      </Heading>
      {children && <div className="section-header__lead">{children}</div>}
    </div>
  );
}
