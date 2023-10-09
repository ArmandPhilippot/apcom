import { describe, expect, it } from '@jest/globals';
import NextImage from 'next/image';
import { render, screen as rtlScreen } from '../../../../tests/utils';
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
        logo={
          <NextImage
            alt="A logo"
            height={200}
            src="https://picsum.photos/200"
            width={200}
          />
        }
        motionStorageKey="reduced-motion"
        name={<h1>{title}</h1>}
        nav={nav}
        searchPage="#"
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
        logo={
          <NextImage
            alt="A photo"
            height={200}
            src="https://picsum.photos/200"
            width={200}
          />
        }
        motionStorageKey="reduced-motion"
        name={<div>{title}</div>}
        nav={nav}
        searchPage="#"
      />
    );
    expect(rtlScreen.getByRole('navigation')).toBeInTheDocument();
  });
});
