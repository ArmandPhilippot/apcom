import { render, screen } from '../../../../tests/utils';
import NavLink from './nav-link';

describe('NavLink', () => {
  it('renders a nav link to blog page', () => {
    render(<NavLink href="/blog" label="Blog" />);
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute(
      'href',
      '/blog'
    );
  });
});
