import { BookX, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { Notice } from '../components/ui/Notice';
import { PageHeader } from '../components/ui/PageHeader';
import { getGlossaryEntry, glossary } from '../data/glossary';

export function GlossaryPage() {
  const [query, setQuery] = useState('');
  const { hash } = useLocation();

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossary;
    return glossary.filter((e) => [e.term, e.short, e.detail].some((t) => t.toLowerCase().includes(q)));
  }, [query]);

  // Scroll to a linked term, e.g. /glossary#waiting-period from a popover.
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <>
      <PageHeader eyebrow="Glossary" title="Insurance words, in plain English">
        Short explanations of terms you will see in health insurance. They are general guidance, not a replacement
        for the wording in a real policy.
      </PageHeader>

      <div className="container page-body page-body--narrow">
        <div className="search-field">
          <label htmlFor="glossary-search" className="visually-hidden">Search the glossary</label>
          <Search className="search-field__icon" size={20} aria-hidden />
          <input
            id="glossary-search"
            type="search"
            className="input search-field__input"
            placeholder="Search terms, for example “waiting”"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="results-count" role="status" aria-live="polite">
          {entries.length} of {glossary.length} terms
        </p>

        {entries.length === 0 ? (
          <div className="empty-state">
            <span className="icon-tile icon-tile--lg"><BookX size={28} aria-hidden /></span>
            <h2 className="empty-state__title">No terms match &ldquo;{query}&rdquo;</h2>
            <p>Try a shorter word, or clear the search to see every term.</p>
            <button type="button" className="button button--primary" onClick={() => setQuery('')}>Clear search</button>
          </div>
        ) : (
          <dl className="glossary-list">
            {entries.map((entry) => (
              <div key={entry.id} id={entry.id} className="glossary-entry" tabIndex={-1}>
                <dt className="glossary-entry__term">{entry.term}</dt>
                <dd>
                  <p className="glossary-entry__short">{entry.short}</p>
                  <p>{entry.detail}</p>
                  {entry.example && (
                    <p className="glossary-entry__example">
                      <strong>Example:</strong> {entry.example}
                    </p>
                  )}
                  {entry.related && (
                    <p className="glossary-entry__related">
                      Related:{' '}
                      {entry.related.map((id, i) => (
                        <span key={id}>
                          {i > 0 && ', '}
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

        <Notice tone="info" title="Always check the policy wording">
          Insurers may use these words in slightly different ways. If anything is unclear, ask the insurer or a
          licensed agent or broker to explain it in writing.
        </Notice>
      </div>
    </>
  );
}
