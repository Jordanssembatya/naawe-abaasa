import { CircleHelp, X } from 'lucide-react';
import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { useI18n } from '../../i18n/I18nProvider';

interface TermProps {
  id: string;
  /** Visible text. Defaults to the glossary term in lower case. */
  children?: ReactNode;
}

interface Position {
  top: number;
  left: number;
}

const GUTTER = 16;

/**
 * An inline insurance term that opens a plain-language explanation on click
 * or tap. Works with keyboard (Enter/Space to open, Escape to close) and does
 * not depend on hover.
 */
export function Term({ id, children }: TermProps) {
  const { t, locale, getGlossaryEntry } = useI18n();
  const entry = getGlossaryEntry(id);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const popoverId = useId();

  // Fixed positioning lets the popover escape scrollable containers such as
  // the comparison table, while staying inside the viewport.
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const popover = popoverRef.current;
      if (!trigger || !popover) return;
      const viewportWidth = document.documentElement.clientWidth;
      const left = Math.max(GUTTER, Math.min(trigger.left, viewportWidth - GUTTER - popover.offsetWidth));
      let top = trigger.bottom + 8;
      const fitsBelow = top + popover.offsetHeight <= window.innerHeight - GUTTER;
      const fitsAbove = trigger.top - 8 - popover.offsetHeight >= GUTTER;
      if (!fitsBelow && fitsAbove) top = trigger.top - 8 - popover.offsetHeight;
      setPosition({ top, left });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (!entry) return <>{children}</>;

  const toggle = () => {
    setPosition(null);
    setOpen((o) => !o);
  };

  return (
    <span className="term" ref={wrapperRef}>
      <button
        ref={triggerRef}
        type="button"
        className="term__trigger"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        onClick={toggle}
      >
        {children ?? entry.term.toLowerCase()}
        <CircleHelp size={14} aria-hidden className="term__icon" />
        <span className="visually-hidden">{t('glossary.term.whatDoesThisMean')}</span>
      </button>
      {open && (
        <span
          ref={popoverRef}
          id={popoverId}
          className="term__popover"
          role="note"
          aria-label={t('glossary.term.explained', { term: entry.term })}
          style={position ? { top: position.top, left: position.left } : { visibility: 'hidden' }}
        >
          <span className="term__popover-head">
            <strong>
              {entry.term}
              {locale !== 'en' && (
                <span className="term-english" lang="en">
                  {entry.englishTerm}
                </span>
              )}
            </strong>
            <button type="button" className="icon-button icon-button--sm" onClick={() => setOpen(false)} aria-label={t('glossary.term.close')}>
              <X size={16} aria-hidden />
            </button>
          </span>
          <span className="term__popover-text">{entry.short}</span>
          <span className="term__popover-foot">
            {t('glossary.term.foot')}{' '}
            <Link to={`/glossary#${entry.id}`} onClick={() => setOpen(false)}>
              {t('glossary.term.more')}
            </Link>
          </span>
        </span>
      )}
    </span>
  );
}
