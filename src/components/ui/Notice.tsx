import { CircleAlert, Info, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';

type NoticeTone = 'info' | 'warning' | 'critical';

const icons = { info: Info, warning: TriangleAlert, critical: CircleAlert };

interface NoticeProps {
  tone?: NoticeTone;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Notice({ tone = 'info', title, children, className = '' }: NoticeProps) {
  const Icon = icons[tone];
  return (
    <div className={`notice notice--${tone} ${className}`}>
      <Icon className="notice__icon" size={20} aria-hidden />
      <div className="notice__body">
        {title && <p className="notice__title">{title}</p>}
        <div className="notice__content">{children}</div>
      </div>
    </div>
  );
}
