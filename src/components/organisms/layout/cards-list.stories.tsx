import { ComponentMeta, ComponentStory } from '@storybook/react';
import CardsListComponent, { type CardsListItem } from './cards-list';

export default {
  title: 'Organisms/Layout',
  component: CardsListComponent,
  args: {
    kind: 'unordered',
  },
  argTypes: {
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
      src: 'http://placeimg.com/640/480',
      width: 640,
      height: 480,
    },
    meta: [
      { id: 'meta-1', term: 'Quibusdam', value: ['Velit', 'Ex', 'Alias'] },
    ],
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
    meta: [{ id: 'meta-1', term: 'Est', value: ['Voluptas'] }],
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
    meta: [
      {
        id: 'meta-1',
        term: 'Omnis',
        value: ['Quisquam', 'Quia', 'Sapiente', 'Perspiciatis'],
      },
    ],
    tagline: 'Quo error eum',
    title: 'Magni rem nulla',
    url: '#',
  },
];

export const CardsList = Template.bind({});
CardsList.args = {
  items,
  titleLevel: 2,
};
