import { Link } from 'react-router';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__about">
          <Logo />
          <p>
            A prototype to help people in Uganda understand and compare health insurance in plain English. It does
            not sell insurance, decide eligibility or process payments.
          </p>
        </div>
        <nav aria-label="Explore">
          <p className="site-footer__heading">Explore</p>
          <ul>
            <li><Link to="/products">All products</Link></li>
            <li><Link to="/compare">Compare plans</Link></li>
            <li><Link to="/glossary">Insurance glossary</Link></li>
          </ul>
        </nav>
        <nav aria-label="Transparency">
          <p className="site-footer__heading">Transparency</p>
          <ul>
            <li><Link to="/about">About this prototype</Link></li>
            <li><Link to="/about#demo-data">About the product data</Link></li>
            <li><Link to="/about#verify">How to verify details</Link></li>
          </ul>
        </nav>
        <div>
          <p className="site-footer__heading">Before you choose</p>
          <p className="site-footer__note">
            Product terms can change. Confirm the current cover, limits and price with the insurer or a licensed
            agent or broker before you pay anything.
          </p>
        </div>
      </div>
      <div className="site-footer__bar">
        <div className="container site-footer__bar-inner">
          <p>Prototype for the UIA Simplified Health Insurance Access challenge. All products shown are fictional.</p>
          <p>Not affiliated with or endorsed by the Uganda Insurers Association or any insurer.</p>
        </div>
      </div>
    </footer>
  );
}
