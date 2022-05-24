import { ComponentMeta, ComponentStory } from '@storybook/react';
import Section from './section';

/**
 * Section - Storybook Meta
 */
export default {
  title: 'Atoms/Layout/Section',
  component: Section,
  args: {
    variant: 'dark',
    withBorder: true,
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the section element.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    content: {
      control: {
        type: 'text',
      },
      description: 'The section content.',
      type: {
        name: 'string',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The section title.',
      type: {
        name: 'string',
        required: true,
      },
    },
    variant: {
      control: {
        type: 'select',
      },
      description: 'The section variant.',
      options: ['light', 'dark'],
      table: {
        category: 'Styles',
        defaultValue: { summary: 'dark' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    withBorder: {
      control: {
        type: 'boolean',
      },
      description: 'Add a border at the bottom of the section.',
      table: {
        category: 'Styles',
        defaultValue: { summary: true },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args} />
);

/**
 * Section Stories - Light
 */
export const Light = Template.bind({});
Light.args = {
  title: 'A title',
  content: 'The content.',
  variant: 'light',
};

/**
 * Section Stories - Dark
 */
export const Dark = Template.bind({});
Dark.args = {
  title: 'A title',
  content: 'The content.',
  variant: 'dark',
};
