import { render, screen } from '@tests/utils';
import Breadcrumb, { type BreadcrumbItem } from './breadcrumb';

const items: BreadcrumbItem[] = [
  { id: 'home', url: '#', name: 'Home' },
  { id: 'blog', url: '#', name: 'Blog' },
  { id: 'post1', url: '#', name: 'A Post' },
];

describe('Breadcrumb', () => {
  it('renders a navigation', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
