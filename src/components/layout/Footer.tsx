import { Link } from 'react-router';
import { useI18n } from '../../i18n/I18nProvider';
import { Logo } from './Logo';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__about">
          <Logo />
          <p>{t('footer.about')}</p>
        </div>
        <nav aria-label={t('footer.explore')}>
          <p className="site-footer__heading">{t('footer.explore')}</p>
          <ul>
            <li><Link to="/products">{t('footer.allProducts')}</Link></li>
            <li><Link to="/compare">{t('footer.comparePlans')}</Link></li>
            <li><Link to="/glossary">{t('footer.glossary')}</Link></li>
          </ul>
        </nav>
        <nav aria-label={t('footer.transparency')}>
          <p className="site-footer__heading">{t('footer.transparency')}</p>
          <ul>
            <li><Link to="/about">{t('footer.aboutPrototype')}</Link></li>
            <li><Link to="/about#demo-data">{t('footer.aboutData')}</Link></li>
            <li><Link to="/about#verify">{t('footer.howToVerify')}</Link></li>
          </ul>
        </nav>
        <div>
          <p className="site-footer__heading">{t('footer.beforeYouChoose')}</p>
          <p className="site-footer__note">{t('footer.beforeNote')}</p>
        </div>
      </div>
      <div className="site-footer__bar">
        <div className="container site-footer__bar-inner">
          <p>{t('footer.challenge')}</p>
          <p>{t('footer.notAffiliated')}</p>
        </div>
      </div>
    </footer>
  );
}
