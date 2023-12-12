import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Breadcrumbs, type BreadcrumbsItem } from './breadcrumbs';

const items: BreadcrumbsItem[] = [
  { id: 'home', slug: '#', label: 'Home' },
  { id: 'blog', slug: '#', label: 'Blog' },
  { id: 'post1', slug: '#', label: 'A Post' },
];

describe('Breadcrumbs', () => {
  it('renders a list of items wrapped in a nav element', () => {
    const ariaLabel = 'error tempore iure';

    render(<Breadcrumbs aria-label={ariaLabel} items={items} />);

    expect(rtlScreen.getByRole('navigation')).toHaveAccessibleName(ariaLabel);
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(items.length);
    // The last item should not be linked
    expect(rtlScreen.getAllByRole('link')).toHaveLength(items.length - 1);
  });
});
