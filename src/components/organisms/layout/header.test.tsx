import { render, screen } from '@test-utils';
import Header from './header';

const nav = [
  { id: 'home-link', href: '#', label: 'Home' },
  { id: 'blog-link', href: '#', label: 'Blog' },
  { id: 'cv-link', href: '#', label: 'CV' },
  { id: 'contact-link', href: '#', label: 'Contact' },
];

const photo = 'http://placeimg.com/640/480/nightlife';

const title = 'Assumenda quis quod';

describe('Header', () => {
  it('renders the website title', () => {
    render(
      <Header
        searchPage="#"
        title={title}
        photo={photo}
        nav={nav}
        isHome={true}
      />
    );
    expect(
      screen.getByRole('heading', { level: 1, name: title })
    ).toBeInTheDocument();
  });

  it('renders the main nav', () => {
    render(<Header searchPage="#" title={title} photo={photo} nav={nav} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
