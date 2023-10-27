import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Toolbar } from './toolbar';

const nav = [
  { id: 'home-link', href: '/', label: 'Home' },
  { id: 'blog-link', href: '/blog', label: 'Blog' },
  { id: 'cv-link', href: '/cv', label: 'CV' },
  { id: 'contact-link', href: '/contact', label: 'Contact' },
];

describe('Toolbar', () => {
  it('renders a navigation menu', () => {
    render(<Toolbar nav={nav} searchPage="#" />);
    expect(rtlScreen.getByRole('navigation')).toBeInTheDocument();
  });
});
