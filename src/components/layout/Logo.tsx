export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`logo${inverted ? ' logo--inverted' : ''}`}>
      <svg className="logo__mark" viewBox="0 0 32 32" width="32" height="32" aria-hidden>
        <rect width="32" height="32" rx="7" fill={inverted ? 'var(--color-teal)' : 'var(--color-navy)'} />
        <path d="M16 7l8 3v6c0 5-3.4 8.4-8 9.6C11.4 24.4 8 21 8 16v-6l8-3z" fill={inverted ? 'var(--color-navy)' : 'var(--color-teal)'} />
        <path d="M14.5 12h3v3h3v3h-3v3h-3v-3h-3v-3h3z" fill="#fff" />
      </svg>
      <span className="logo__text">
        AfyaGuide <span className="logo__country">Uganda</span>
      </span>
    </span>
  );
}
