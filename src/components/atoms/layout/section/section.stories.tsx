import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../headings';
import { Section } from './section';

/**
 * Section - Storybook Meta
 */
export default {
  title: 'Atoms/Layout/Section',
  component: Section,
  args: {
    hasBorder: true,
    variant: 'light',
  },
  argTypes: {
    children: {
      description: 'The section content.',
      type: {
        name: 'function',
        required: true,
      },
    },
    hasBorder: {
      control: {
        type: 'boolean',
      },
      description: 'Add a border at the bottom of the section.',
      table: {
        category: 'Styles',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
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
  children: (
    <>
      <Heading level={2}>A section title</Heading>
      <div>The body</div>
    </>
  ),
  variant: 'light',
};

/**
 * Section Stories - Dark
 */
export const Dark = Template.bind({});
Dark.args = {
  children: (
    <>
      <Heading level={2}>A section title</Heading>
      <div>The body</div>
    </>
  ),
  variant: 'dark',
};
