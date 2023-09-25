import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { Header } from './header';

const nav = [
  { id: 'home-link', href: '#', label: 'Home' },
  { id: 'blog-link', href: '#', label: 'Blog' },
  { id: 'cv-link', href: '#', label: 'CV' },
  { id: 'contact-link', href: '#', label: 'Contact' },
];

const photo = 'http://placeimg.com/640/480/nightlife';

const title = 'Assumenda quis quod';

describe('Header', () => {
  it('renders the website title', () => {
    render(
      <Header
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
      screen.getByRole('heading', { level: 1, name: title })
    ).toBeInTheDocument();
  });

  it('renders the main nav', () => {
    render(
      <Header
        ackeeStorageKey="ackee-tracking"
        motionStorageKey="reduced-motion"
        nav={nav}
        photo={photo}
        searchPage="#"
        title={title}
      />
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
