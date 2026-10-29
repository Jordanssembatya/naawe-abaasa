import { BookX, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { Notice } from '../components/ui/Notice';
import { PageHeader } from '../components/ui/PageHeader';
import { useI18n } from '../i18n/I18nProvider';

export function GlossaryPage() {
  const { t, locale, glossary, getGlossaryEntry } = useI18n();
  const [query, setQuery] = useState('');
  const { hash } = useLocation();

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossary;
    // The English term matches too, since policy documents use it.
    return glossary.filter((e) => [e.term, e.englishTerm, e.short, e.detail].some((text) => text.toLowerCase().includes(q)));
  }, [query, glossary]);

  // Scroll to a linked term, e.g. /glossary#waiting-period from a popover.
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <>
      <PageHeader eyebrow={t('glossary.eyebrow')} title={t('glossary.title')}>
        {t('glossary.lead')}
      </PageHeader>

      <div className="container page-body page-body--narrow">
        <div className="search-field">
          <label htmlFor="glossary-search" className="visually-hidden">{t('glossary.searchLabel')}</label>
          <Search className="search-field__icon" size={20} aria-hidden />
          <input
            id="glossary-search"
            type="search"
            className="input search-field__input"
            placeholder={t('glossary.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="results-count" role="status" aria-live="polite">
          {t('glossary.count', { count: entries.length, total: glossary.length })}
        </p>

        {entries.length === 0 ? (
          <div className="empty-state">
            <span className="icon-tile icon-tile--lg"><BookX size={28} aria-hidden /></span>
            <h2 className="empty-state__title">{t('glossary.emptyTitle', { query })}</h2>
            <p>{t('glossary.emptyText')}</p>
            <button type="button" className="button button--primary" onClick={() => setQuery('')}>{t('glossary.clearSearch')}</button>
          </div>
        ) : (
          <dl className="glossary-list">
            {entries.map((entry) => (
              <div key={entry.id} id={entry.id} className="glossary-entry" tabIndex={-1}>
                <dt className="glossary-entry__term">
                  {entry.term}
                  {locale !== 'en' && (
                    <span className="term-english" lang="en">
                      {t('glossary.englishTerm', { term: entry.englishTerm })}
                    </span>
                  )}
                </dt>
                <dd>
                  <p className="glossary-entry__short">{entry.short}</p>
                  <p>{entry.detail}</p>
                  {entry.example && (
                    <p className="glossary-entry__example">
                      <strong>{t('glossary.example')}</strong> {entry.example}
                    </p>
                  )}
                  {entry.related && (
                    <p className="glossary-entry__related">
                      {t('glossary.related')}{' '}
                      {entry.related.map((id, i) => (
                        <span key={id}>
                          {i > 0 && t('common.listSeparator')}
                          <a href={`#${id}`} onClick={() => setQuery('')}>{getGlossaryEntry(id)?.term}</a>
                        </span>
                      ))}
                    </p>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <Notice tone="info" title={t('glossary.noticeTitle')}>
          {t('glossary.noticeText')}
        </Notice>
      </div>
    </>
  );
}
