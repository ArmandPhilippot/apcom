import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from './heading';

/**
 * Heading - Storybook Meta
 */
export default {
  title: 'Atoms/Headings',
  component: Heading,
  args: {
    isFake: false,
  },
  argTypes: {
    children: {
      description: 'Heading body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    isFake: {
      control: {
        type: 'boolean',
      },
      description: 'Use an heading element or only its styles.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    level: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      description: 'Heading level.',
      type: {
        name: 'number',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args} />
);

/**
 * Heading Story - h1
 */
export const H1 = Template.bind({});
H1.args = {
  children: 'Your title',
  level: 1,
};

/**
 * Heading Story - h2
 */
export const H2 = Template.bind({});
H2.args = {
  children: 'Your title',
  level: 2,
};

/**
 * Heading Story - h3
 */
export const H3 = Template.bind({});
H3.args = {
  children: 'Your title',
  level: 3,
};

/**
 * Heading Story - h4
 */
export const H4 = Template.bind({});
H4.args = {
  children: 'Your title',
  level: 4,
};

/**
 * Heading Story - h5
 */
export const H5 = Template.bind({});
H5.args = {
  children: 'Your title',
  level: 5,
};

/**
 * Heading Story - h6
 */
export const H6 = Template.bind({});
H6.args = {
  children: 'Your title',
  level: 6,
};
