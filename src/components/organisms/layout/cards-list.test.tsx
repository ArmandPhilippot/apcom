import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { CardsList, type CardsListItem } from './cards-list';

const items: CardsListItem[] = [
  {
    id: 'card-1',
    cover: {
      alt: 'card 1 picture',
      src: 'https://picsum.photos/640/480',
      width: 640,
      height: 480,
    },
    meta: [
      {
        id: 'categories',
        label: 'Categories',
        value: [
          { id: 'velit', value: 'Velit' },
          { id: 'ex', value: 'Ex' },
          { id: 'alias', value: 'Alias' },
        ],
      },
    ],
    tagline: 'Molestias ut error',
    title: 'Et alias omnis',
    url: '#',
  },
  {
    id: 'card-2',
    cover: {
      alt: 'card 2 picture',
      src: 'https://picsum.photos/640/480',
      width: 640,
      height: 480,
    },
    meta: [{ id: 'categories', label: 'Categories', value: 'Voluptas' }],
    tagline: 'Quod vel accusamus',
    title: 'Laboriosam doloremque mollitia',
    url: '#',
  },
  {
    id: 'card-3',
    cover: {
      alt: 'card 3 picture',
      src: 'https://picsum.photos/640/480',
      width: 640,
      height: 480,
    },
    meta: [
      {
        id: 'categories',
        label: 'Categories',
        value: [
          { id: 'quisquam', value: 'Quisquam' },
          { id: 'quia', value: 'Quia' },
          { id: 'sapiente', value: 'Sapiente' },
          { id: 'perspiciatis', value: 'Perspiciatis' },
        ],
      },
    ],
    tagline: 'Quo error eum',
    title: 'Magni rem nulla',
    url: '#',
  },
];

describe('CardsList', () => {
  it('renders a list of cards', () => {
    render(<CardsList items={items} titleLevel={2} />);
    expect(rtlScreen.getAllByRole('heading', { level: 2 })).toHaveLength(
      items.length
    );
  });
});
