import { render, screen } from '../../../../tests/utils';
import Toolbar from './toolbar';

const nav = [
  { id: 'home-link', href: '/', label: 'Home' },
  { id: 'blog-link', href: '/blog', label: 'Blog' },
  { id: 'cv-link', href: '/cv', label: 'CV' },
  { id: 'contact-link', href: '/contact', label: 'Contact' },
];

describe('Toolbar', () => {
  it('renders a navigation menu', () => {
    render(
      <Toolbar
        ackeeStorageKey="ackee-tracking"
        motionStorageKey="reduced-motion"
        nav={nav}
        searchPage="#"
      />
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
