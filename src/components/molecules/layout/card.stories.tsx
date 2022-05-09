import { ComponentMeta, ComponentStory } from '@storybook/react';
import Card from './card';

/**
 * Card - Storybook Meta
 */
export default {
  title: 'Molecules/Layout/Card',
  component: Card,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the card wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
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
    coverFit: {
      control: {
        type: 'select',
      },
      description: 'The cover fit.',
      options: ['contain', 'cover', 'fill', 'scale-down'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'cover' },
      },
      type: {
        name: 'string',
        required: false,
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
        min: 1,
        max: 6,
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
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

const cover = {
  alt: 'A picture',
  height: 480,
  src: 'http://placeimg.com/640/480',
  width: 640,
  unoptimized: true,
};

const meta = {
  thematics: ['Autem', 'Eos'],
};

/**
 * Card Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  title: 'Veritatis dicta quod',
  titleLevel: 2,
  url: '#',
};

/**
 * Card Stories - With cover
 */
export const WithCover = Template.bind({});
WithCover.args = {
  cover,
  title: 'Veritatis dicta quod',
  titleLevel: 2,
  url: '#',
};

/**
 * Card Stories - With meta
 */
export const WithMeta = Template.bind({});
WithMeta.args = {
  meta,
  title: 'Veritatis dicta quod',
  titleLevel: 2,
  url: '#',
};

/**
 * Card Stories - With tagline
 */
export const WithTagline = Template.bind({});
WithTagline.args = {
  tagline: 'Ullam accusantium ipsa',
  title: 'Veritatis dicta quod',
  titleLevel: 2,
  url: '#',
};

/**
 * Card Stories - With all data
 */
export const WithAll = Template.bind({});
WithAll.args = {
  cover,
  meta,
  tagline: 'Ullam accusantium ipsa',
  title: 'Veritatis dicta quod',
  titleLevel: 2,
  url: '#',
};
