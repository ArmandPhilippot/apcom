import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { SiteHeader } from './site-header';

const nav = [
  { id: 'home-link', href: '#', label: 'Home' },
  { id: 'blog-link', href: '#', label: 'Blog' },
  { id: 'cv-link', href: '#', label: 'CV' },
  { id: 'contact-link', href: '#', label: 'Contact' },
];

const photo = 'http://placeimg.com/640/480/nightlife';

const title = 'Assumenda quis quod';

describe('SiteHeader', () => {
  it('renders the website title', () => {
    render(
      <SiteHeader
        ackeeStorageKey="ackee-tracking"
        isHome={true}
        motionStorageKey="reduced-motion"
        nav={nav}
        photo={photo}
        searchPage="#"
        title={title}
      />
    );
    expect(
      rtlScreen.getByRole('heading', { level: 1, name: title })
    ).toBeInTheDocument();
  });

  it('renders the main nav', () => {
    render(
      <SiteHeader
        ackeeStorageKey="ackee-tracking"
        motionStorageKey="reduced-motion"
        nav={nav}
        photo={photo}
        searchPage="#"
        title={title}
      />
    );
    expect(rtlScreen.getByRole('navigation')).toBeInTheDocument();
  });
});
