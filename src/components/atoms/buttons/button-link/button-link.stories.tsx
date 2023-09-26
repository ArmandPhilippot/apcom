import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ButtonLink } from './button-link';

/**
 * ButtonLink - Storybook Meta
 */
export default {
  title: 'Atoms/Buttons/ButtonLink',
  component: ButtonLink,
  args: {
    isExternal: false,
    shape: 'rectangle',
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The link body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    isExternal: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if the link is an external link.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    kind: {
      control: {
        type: 'select',
      },
      description: 'The link kind.',
      options: ['primary', 'secondary', 'tertiary'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'secondary' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    shape: {
      control: {
        type: 'select',
      },
      description: 'The link shape.',
      options: ['circle', 'rectangle', 'square'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'rectangle' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    to: {
      control: {
        type: 'text',
      },
      description: 'The link target.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof ButtonLink>;

const Template: ComponentStory<typeof ButtonLink> = (args) => (
  <ButtonLink {...args} />
);

/**
 * ButtonLink Story - Primary
 */
export const Primary = Template.bind({});
Primary.args = {
  children: 'Link',
  kind: 'primary',
  to: '#',
};

/**
 * ButtonLink Story - Secondary
 */
export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Link',
  kind: 'secondary',
  to: '#',
};

/**
 * ButtonLink Story - Tertiary
 */
export const Tertiary = Template.bind({});
Tertiary.args = {
  children: 'Link',
  kind: 'tertiary',
  to: '#',
};
