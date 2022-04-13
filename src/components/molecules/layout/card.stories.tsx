import { ComponentMeta, ComponentStory } from '@storybook/react';
import CardComponent from './card';

export default {
  title: 'Molecules/Layout',
  component: CardComponent,
  argTypes: {
    cover: {
      description: 'The card cover data (src, dimensions, alternative text).',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    meta: {
      description: 'The card metadata (a publication date for example).',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    tagline: {
      control: {
        type: 'text',
      },
      description: 'A few words about the card.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The card title.',
      type: {
        name: 'string',
        required: true,
      },
    },
    titleLevel: {
      control: {
        type: 'number',
      },
      description: 'The title level.',
      type: {
        name: 'number',
        required: true,
      },
    },
    url: {
      control: {
        type: 'text',
      },
      description: 'The card target.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof CardComponent>;

const Template: ComponentStory<typeof CardComponent> = (args) => (
  <CardComponent {...args} />
);

const cover = {
  alt: 'A picture',
  height: 480,
  src: 'http://placeimg.com/640/480',
  width: 640,
};

const meta = [
  {
    id: 'an-id',
    term: 'Voluptates',
    value: ['Autem', 'Eos'],
  },
];

export const Card = Template.bind({});
Card.args = {
  cover,
  meta,
  title: 'Veritatis dicta quod',
  titleLevel: 2,
  url: '#',
};
