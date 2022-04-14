import { render, screen } from '@test-utils';
import Toolbar from './toolbar';

const nav = [
  { id: 'home-link', href: '/', label: 'Home' },
  { id: 'blog-link', href: '/blog', label: 'Blog' },
  { id: 'cv-link', href: '/cv', label: 'CV' },
  { id: 'contact-link', href: '/contact', label: 'Contact' },
];

describe('Toolbar', () => {
  it('renders a navigation menu', () => {
    render(<Toolbar nav={nav} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
