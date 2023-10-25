import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { MainNavItem } from './main-nav';

const doNothing = () => {
  // do nothing
};

const items = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

describe('MainNavItem', () => {
  it('renders a checkbox to open main nav', () => {
    render(
      <MainNavItem items={items} isActive={false} setIsActive={doNothing} />
    );
    expect(rtlScreen.getByRole('checkbox')).toHaveAccessibleName('Open menu');
  });

  it('renders a checkbox to close main nav', () => {
    render(
      <MainNavItem items={items} isActive={true} setIsActive={doNothing} />
    );
    expect(rtlScreen.getByRole('checkbox')).toHaveAccessibleName('Close menu');
  });

  it('renders the correct number of items', () => {
    render(
      <MainNavItem items={items} isActive={true} setIsActive={doNothing} />
    );
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(items.length);
  });

  it('renders some links with the right label', () => {
    render(
      <MainNavItem items={items} isActive={true} setIsActive={doNothing} />
    );
    expect(
      rtlScreen.getByRole('link', { name: items[0].label })
    ).toHaveAttribute('href', items[0].href);
  });
});
