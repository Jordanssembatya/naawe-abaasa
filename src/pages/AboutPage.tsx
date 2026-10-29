import { CircleCheck, CircleX } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Notice } from '../components/ui/Notice';
import { PageHeader } from '../components/ui/PageHeader';

const does = [
  'Explains health insurance products in plain English',
  'Shows the same details for every product so you can compare',
  'Marks missing details clearly instead of guessing',
  'Gives you a checklist of what to confirm before enrolling',
];

const doesNot = [
  'Sell insurance or issue policies',
  'Decide whether you are eligible',
  'Take payments or collect documents',
  'Ask for your medical history or create an account',
];

export function AboutPage() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <>
      <PageHeader eyebrow="About and transparency" title="What AfyaGuide is, and what it is not">
        AfyaGuide Uganda is a prototype built for the Uganda Insurers Association Simplified Health Insurance Access
        challenge. It helps people understand health insurance before they speak to an insurer.
      </PageHeader>

      <div className="container page-body page-body--narrow prose">
        <section aria-labelledby="purpose">
          <h2 id="purpose">Purpose</h2>
          <p>
            Many people in Uganda, especially those in informal work, have never bought health insurance. Product
            information can be hard to find and full of unfamiliar words. AfyaGuide brings the key facts together in
            one consistent format so people can understand and compare their options.
          </p>
          <div className="two-col">
            <div className="side-card">
              <h3 className="side-card__title">AfyaGuide does</h3>
              <ul className="info-list">
                {does.map((d) => (
                  <li key={d}><span className="info-list__icon info-list__icon--positive" aria-hidden><CircleCheck size={18} /></span><span>{d}</span></li>
                ))}
              </ul>
            </div>
            <div className="side-card">
              <h3 className="side-card__title">AfyaGuide does not</h3>
              <ul className="info-list">
                {doesNot.map((d) => (
                  <li key={d}><span className="info-list__icon info-list__icon--negative" aria-hidden><CircleX size={18} /></span><span>{d}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="demo-data">
          <h2 id="demo-data">Verified information and demonstration data</h2>
          <p>
            The product records in this prototype exist only to show how the platform works. Verified records would
            show the date their details were checked against the insurer&rsquo;s official documents.
          </p>
          <Notice tone="warning" title="Every product in this prototype is fictional">
            The products, insurer names, prices and limits are fictional. They do not describe products offered by
            any Ugandan insurer. Insurer names such as &ldquo;Demo Insurer A&rdquo; are placeholders.
          </Notice>
          <p>
            When a detail is not in a record, AfyaGuide shows &ldquo;Not specified in demonstration data&rdquo;. This
            never means a benefit is unlimited or that no restriction applies.
          </p>
        </section>

        <section aria-labelledby="changes">
          <h2 id="changes">Terms can change</h2>
          <p>
            Insurers can change prices, benefit limits, exclusions and waiting periods. Even verified information can
            go out of date. Always confirm the current terms with the insurer before you commit or pay.
          </p>
        </section>

        <section aria-labelledby="verify">
          <h2 id="verify">How to verify details before you decide</h2>
          <ol className="numbered-list">
            <li>Get the product information and policy wording directly from the insurer, through its official office or published channels.</li>
            <li>If you use an agent or broker, ask to see proof that they are licensed by the insurance regulator.</li>
            <li>Ask for the current premium, benefit limits, exclusions and waiting periods in writing.</li>
            <li>Only pay through payment channels the insurer confirms in writing, and keep every receipt.</li>
            <li>Read the full policy document before you sign. Ask questions about anything you do not understand.</li>
          </ol>
          <p>
            You can use the <Link to="/glossary">glossary</Link> to understand common terms, and each product&rsquo;s
            enrolment guide as a checklist of questions to ask.
          </p>
        </section>

        <section aria-labelledby="affiliation">
          <h2 id="affiliation">Affiliation</h2>
          <p>
            AfyaGuide Uganda is an independent prototype. It is not affiliated with, endorsed by, accredited by or in
            partnership with the Uganda Insurers Association, the insurance regulator or any insurer.
          </p>
        </section>
      </div>
    </>
  );
}
