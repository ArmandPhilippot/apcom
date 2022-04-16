import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SummaryComponent from './summary';

export default {
  title: 'Organisms/Layout',
  component: SummaryComponent,
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
} as ComponentMeta<typeof SummaryComponent>;

const Template: ComponentStory<typeof SummaryComponent> = (args) => (
  <IntlProvider locale="en">
    <SummaryComponent {...args} />
  </IntlProvider>
);

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

export const Summary = Template.bind({});
Summary.args = {
  cover: {
    alt: 'A cover',
    height: 480,
    src: 'http://placeimg.com/640/480',
    width: 640,
  },
  excerpt:
    'Perspiciatis quasi libero nemo non eligendi nam minima. Deleniti expedita tempore. Praesentium explicabo molestiae eaque consectetur vero. Quae nostrum quisquam similique. Ut hic est quas ut esse quisquam nobis.',
  meta,
  title: 'Odio odit necessitatibus',
  url: '#',
};
