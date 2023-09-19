import { render, screen } from '../../../../tests/utils';
import LinksListWidget from './links-list-widget';

const title = 'Voluptatem minus autem';

const items = [
  { name: 'Item 1', url: '/item-1' },
  { name: 'Item 2', url: '/item-2' },
  { name: 'Item 3', url: '/item-3' },
];

describe('LinksListWidget', () => {
  it('renders a widget title', () => {
    render(<LinksListWidget items={items} title={title} level={2} />);
    expect(
      screen.getByRole('heading', { level: 2, name: new RegExp(title, 'i') })
    ).toBeInTheDocument();
  });

  it('renders the correct number of items', () => {
    render(<LinksListWidget items={items} title={title} level={2} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(items.length);
  });

  it('renders some links', () => {
    render(<LinksListWidget items={items} title={title} level={2} />);
    expect(screen.getByRole('link', { name: items[0].name })).toHaveAttribute(
      'href',
      items[0].url
    );
  });
});
