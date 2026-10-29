import { Globe, Mail, Phone, ShieldQuestion } from 'lucide-react';
import { Link } from 'react-router';
import { formatDate } from '../../lib/format';
import type { ContactChannel, ContactRoute } from '../../types/product';

const channelIcons = { phone: Phone, email: Mail, website: Globe };

function hrefFor(channel: ContactChannel): string {
  switch (channel.type) {
    case 'phone':
      return `tel:${channel.value.replace(/\s+/g, '')}`;
    case 'email':
      return `mailto:${channel.value}`;
    case 'website':
      return channel.value;
  }
}

/** Shows a verified contact route, or explains that none is available. */
export function ContactRouteCard({ route }: { route: ContactRoute }) {
  if (route.status === 'unverified') {
    return (
      <div className="contact-card contact-card--unverified">
        <div className="icon-tile icon-tile--warning">
          <ShieldQuestion size={22} aria-hidden />
        </div>
        <div>
          <h3 className="contact-card__title">Contact route not verified</h3>
          <p>{route.note}</p>
          <p>
            We do not show phone numbers, emails or links unless they have been verified.{' '}
            <Link to="/about#verify">How to find an official contact</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-card">
      <h3 className="contact-card__title">{route.organisation}</h3>
      <ul className="contact-card__channels">
        {route.channels.map((channel) => {
          const Icon = channelIcons[channel.type];
          const external = channel.type === 'website';
          return (
            <li key={channel.value}>
              <a
                className="button button--primary"
                href={hrefFor(channel)}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon size={16} aria-hidden />
                {channel.label}: {channel.value}
              </a>
            </li>
          );
        })}
      </ul>
      <p className="muted">Contact details verified on {formatDate(route.verifiedAt)}.</p>
    </div>
  );
}
