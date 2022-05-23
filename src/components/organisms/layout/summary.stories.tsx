import { ComponentMeta, ComponentStory } from '@storybook/react';
import Summary from './summary';
import { cover, intro, meta } from './summary.fixture';

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

/**
 * Summary Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  intro,
  meta,
  title: 'Odio odit necessitatibus',
  url: '#',
};

/**
 * Summary Stories - With cover
 */
export const WithCover = Template.bind({});
WithCover.args = {
  intro,
  meta: { ...meta, cover },
  title: 'Odio odit necessitatibus',
  url: '#',
};
