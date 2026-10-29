import { CircleCheck, CircleX } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Notice } from '../components/ui/Notice';
import { PageHeader } from '../components/ui/PageHeader';
import { useI18n } from '../i18n/I18nProvider';
import type { MessageKey } from '../i18n/translator';

const does: MessageKey[] = ['about.does.explains', 'about.does.sameDetails', 'about.does.marksMissing', 'about.does.checklist'];
const doesNot: MessageKey[] = ['about.doesNot.sell', 'about.doesNot.eligibility', 'about.doesNot.payments', 'about.doesNot.medical'];
const verifySteps: MessageKey[] = ['about.verify.source', 'about.verify.licence', 'about.verify.writing', 'about.verify.payments', 'about.verify.read'];

export function AboutPage() {
  const { t, tRich } = useI18n();
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <>
      <PageHeader eyebrow={t('about.eyebrow')} title={t('about.title')}>
        {t('about.lead')}
      </PageHeader>

      <div className="container page-body page-body--narrow prose">
        <section aria-labelledby="purpose">
          <h2 id="purpose">{t('about.purposeTitle')}</h2>
          <p>{t('about.purposeText')}</p>
          <div className="two-col">
            <div className="side-card">
              <h3 className="side-card__title">{t('about.doesTitle')}</h3>
              <ul className="info-list">
                {does.map((d) => (
                  <li key={d}><span className="info-list__icon info-list__icon--positive" aria-hidden><CircleCheck size={18} /></span><span>{t(d)}</span></li>
                ))}
              </ul>
            </div>
            <div className="side-card">
              <h3 className="side-card__title">{t('about.doesNotTitle')}</h3>
              <ul className="info-list">
                {doesNot.map((d) => (
                  <li key={d}><span className="info-list__icon info-list__icon--negative" aria-hidden><CircleX size={18} /></span><span>{t(d)}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="demo-data">
          <h2 id="demo-data">{t('about.dataTitle')}</h2>
          <p>{t('about.dataText')}</p>
          <Notice tone="warning" title={t('about.fictionalTitle')}>
            {t('about.fictionalText')}
          </Notice>
          <p>{t('about.missingText', { label: t('common.notSpecifiedData') })}</p>
        </section>

        <section aria-labelledby="changes">
          <h2 id="changes">{t('about.changesTitle')}</h2>
          <p>{t('about.changesText')}</p>
        </section>

        <section aria-labelledby="verify">
          <h2 id="verify">{t('about.verifyTitle')}</h2>
          <ol className="numbered-list">
            {verifySteps.map((step) => (
              <li key={step}>{t(step)}</li>
            ))}
          </ol>
          <p>{tRich('about.verifyNote', { glossary: <Link to="/glossary">{t('about.glossaryLink')}</Link> })}</p>
        </section>

        <section aria-labelledby="affiliation">
          <h2 id="affiliation">{t('about.affiliationTitle')}</h2>
          <p>{t('about.affiliationText')}</p>
        </section>
      </div>
    </>
  );
}
