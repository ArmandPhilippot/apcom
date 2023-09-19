import { render, screen } from '../../../../tests/utils';
import CardsList, { type CardsListItem } from './cards-list';

const items: CardsListItem[] = [
  {
    id: 'card-1',
    cover: {
      alt: 'card 1 picture',
      src: 'http://placeimg.com/640/480',
      width: 640,
      height: 480,
    },
    meta: { thematics: ['Velit', 'Ex', 'Alias'] },
    tagline: 'Molestias ut error',
    title: 'Et alias omnis',
    url: '#',
  },
  {
    id: 'card-2',
    cover: {
      alt: 'card 2 picture',
      src: 'http://placeimg.com/640/480',
      width: 640,
      height: 480,
    },
    meta: { thematics: ['Voluptas'] },
    tagline: 'Quod vel accusamus',
    title: 'Laboriosam doloremque mollitia',
    url: '#',
  },
  {
    id: 'card-3',
    cover: {
      alt: 'card 3 picture',
      src: 'http://placeimg.com/640/480',
      width: 640,
      height: 480,
    },
    meta: {
      thematics: ['Quisquam', 'Quia', 'Sapiente', 'Perspiciatis'],
    },
    tagline: 'Quo error eum',
    title: 'Magni rem nulla',
    url: '#',
  },
];

describe('CardsList', () => {
  it('renders a list of cards', () => {
    render(<CardsList items={items} titleLevel={2} />);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(
      items.length
    );
  });
});
