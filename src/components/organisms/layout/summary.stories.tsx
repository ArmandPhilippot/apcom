import { ComponentMeta, ComponentStory } from '@storybook/react';
import Summary from './summary';

/**
 * Summary - Storybook Meta
 */
export default {
  title: 'Organisms/Layout/Summary',
  component: Summary,
  args: {
    titleLevel: 2,
  },
  argTypes: {
    cover: {
      description: 'The cover data.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    excerpt: {
      control: {
        type: 'text',
      },
      description: 'The page excerpt.',
      type: {
        name: 'string',
        required: true,
      },
    },
    meta: {
      description: 'The page metadata.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The page title',
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
      description: 'The page title level (hn)',
      table: {
        category: 'Options',
        defaultValue: { summary: 2 },
      },
      type: {
        name: 'number',
        required: false,
      },
    },
    url: {
      control: {
        type: 'text',
      },
      description: 'The page url.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof Summary>;

const Template: ComponentStory<typeof Summary> = (args) => (
  <Summary {...args} />
);

const cover = {
  alt: 'A cover',
  height: 480,
  src: 'http://placeimg.com/640/480',
  width: 640,
  unoptimized: true,
};

const excerpt =
  'Perspiciatis quasi libero nemo non eligendi nam minima. Deleniti expedita tempore. Praesentium explicabo molestiae eaque consectetur vero. Quae nostrum quisquam similique. Ut hic est quas ut esse quisquam nobis.';

const meta = {
  dates: { publication: '2022-04-11' },
  readingTime: { wordsCount: excerpt.split(' ').length },
  thematics: [
    { id: 'cat-1', name: 'Cat 1', url: '#' },
    { id: 'cat-2', name: 'Cat 2', url: '#' },
  ],
  commentsCount: 1,
};

/**
 * Summary Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  excerpt,
  meta,
  title: 'Odio odit necessitatibus',
  url: '#',
};

/**
 * Summary Stories - With cover
 */
export const WithCover = Template.bind({});
WithCover.args = {
  cover,
  excerpt,
  meta,
  title: 'Odio odit necessitatibus',
  url: '#',
};
