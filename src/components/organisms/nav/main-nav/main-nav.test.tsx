import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { MainNav } from './main-nav';

const items = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

describe('MainNav', () => {
  it('renders a list of nav items', () => {
    render(<MainNav items={items} />);

    expect(rtlScreen.getAllByRole('link')).toHaveLength(items.length);
  });
});
