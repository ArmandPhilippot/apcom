import type { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  CardsList as CardsListComponent,
  type CardsListItem,
} from './cards-list';

/**
 * CardsList - Storybook Meta
 */
export default {
  title: 'Organisms/Layout',
  component: CardsListComponent,
  args: {
    coverFit: 'cover',
    kind: 'unordered',
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the list wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    coverFit: {
      control: {
        type: 'select',
      },
      description: 'The cover fit.',
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'cover' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    items: {
      description: 'The cards data.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    kind: {
      control: {
        type: 'select',
      },
      description: 'The list kind.',
      options: ['ordered', 'unordered'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'unordered' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    titleLevel: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      description: 'The heading level for each card.',
      type: {
        name: 'number',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof CardsListComponent>;

const Template: ComponentStory<typeof CardsListComponent> = (args) => (
  <CardsListComponent {...args} />
);

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

/**
 * Layout Stories - Cards list
 */
export const CardsList = Template.bind({});
CardsList.args = {
  items,
  titleLevel: 2,
};
