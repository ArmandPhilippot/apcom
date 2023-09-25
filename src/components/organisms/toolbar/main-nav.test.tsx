import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { MainNav } from './main-nav';

const items = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

describe('MainNav', () => {
  it('renders a checkbox to open main nav', () => {
    render(<MainNav items={items} isActive={false} setIsActive={() => null} />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleName('Open menu');
  });

  it('renders a checkbox to close main nav', () => {
    render(<MainNav items={items} isActive={true} setIsActive={() => null} />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleName('Close menu');
  });

  it('renders the correct number of items', () => {
    render(<MainNav items={items} isActive={true} setIsActive={() => null} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(items.length);
  });

  it('renders some links with the right label', () => {
    render(<MainNav items={items} isActive={true} setIsActive={() => null} />);
    expect(screen.getByRole('link', { name: items[0].label })).toHaveAttribute(
      'href',
      items[0].href
    );
  });
});
