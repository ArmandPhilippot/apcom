import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
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
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
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

const meta = {
  publication: { name: 'Published on:', value: 'April 11th 2022' },
  readingTime: { name: 'Reading time:', value: '5 minutes' },
  categories: {
    name: 'Categories:',
    value: [
      <a key="cat-1" href="#">
        Cat 1
      </a>,
      <a key="cat-2" href="#">
        Cat 2
      </a>,
    ],
  },
  comments: { name: 'Comments:', value: '1 comment' },
};

/**
 * Summary Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  excerpt:
    'Perspiciatis quasi libero nemo non eligendi nam minima. Deleniti expedita tempore. Praesentium explicabo molestiae eaque consectetur vero. Quae nostrum quisquam similique. Ut hic est quas ut esse quisquam nobis.',
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
  excerpt:
    'Perspiciatis quasi libero nemo non eligendi nam minima. Deleniti expedita tempore. Praesentium explicabo molestiae eaque consectetur vero. Quae nostrum quisquam similique. Ut hic est quas ut esse quisquam nobis.',
  meta,
  title: 'Odio odit necessitatibus',
  url: '#',
};
