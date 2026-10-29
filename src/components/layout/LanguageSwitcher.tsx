import { ChevronDown, Globe } from 'lucide-react';
import { useId } from 'react';
import { LOCALES, isLocale, localeInfo } from '../../i18n/config';
import { useI18n } from '../../i18n/I18nProvider';

/**
 * Language picker. A native select (keyboard, screen readers and the phone's
 * own picker all work) sits invisibly over a compact label: the language code
 * on small screens, its name on wider ones.
 */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const id = useId();
  const current = localeInfo(locale);

  return (
    <div className="lang-switcher">
      <label htmlFor={id} className="visually-hidden">
        {t('language.label')}
      </label>
      <span className="lang-switcher__face" aria-hidden>
        <Globe size={18} />
        <span className="lang-switcher__name">{current.name}</span>
        <span className="lang-switcher__short">{current.short}</span>
        <ChevronDown size={14} className="lang-switcher__chevron" />
      </span>
      <select
        id={id}
        className="lang-switcher__select"
        value={locale}
        onChange={(e) => isLocale(e.target.value) && setLocale(e.target.value)}
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code} lang={l.htmlLang}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
