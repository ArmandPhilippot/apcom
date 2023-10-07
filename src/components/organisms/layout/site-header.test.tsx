import { describe, expect, it } from '@jest/globals';
import NextImage from 'next/image';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Logo } from '../../atoms';
import { SiteHeader } from './site-header';

const nav = [
  { id: 'home-link', href: '#', label: 'Home' },
  { id: 'blog-link', href: '#', label: 'Blog' },
  { id: 'cv-link', href: '#', label: 'CV' },
  { id: 'contact-link', href: '#', label: 'Contact' },
];

const title = 'Assumenda quis quod';

describe('SiteHeader', () => {
  it('renders the website title', () => {
    render(
      <SiteHeader
        ackeeStorageKey="ackee-tracking"
        isHome={true}
        logo={<Logo />}
        motionStorageKey="reduced-motion"
        nav={nav}
        photo={
          <NextImage
            alt="A photo"
            height={200}
            src="https://picsum.photos/200"
            width={200}
          />
        }
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
        logo={<Logo />}
        motionStorageKey="reduced-motion"
        nav={nav}
        photo={
          <NextImage
            alt="A photo"
            height={200}
            src="https://picsum.photos/200"
            width={200}
          />
        }
        searchPage="#"
        title={title}
      />
    );
    expect(rtlScreen.getByRole('navigation')).toBeInTheDocument();
  });
});
