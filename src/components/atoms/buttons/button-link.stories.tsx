import { ComponentMeta, ComponentStory } from '@storybook/react';
import ButtonLink from './button-link';

/**
 * ButtonLink - Storybook Meta
 */
export default {
  title: 'Atoms/Buttons/ButtonLink',
  component: ButtonLink,
  args: {
    shape: 'rectangle',
  },
  argTypes: {
    'aria-label': {
      control: {
        type: 'text',
      },
      description: 'An accessible label.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
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
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the button link.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    external: {
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
      options: ['primary', 'secondary'],
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
      options: ['rectangle', 'square'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'rectangle' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    target: {
      control: {
        type: null,
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
  target: '#',
};

/**
 * ButtonLink Story - Secondary
 */
export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Link',
  kind: 'secondary',
  target: '#',
};

/**
 * ButtonLink Story - Tertiary
 */
export const Tertiary = Template.bind({});
Tertiary.args = {
  children: 'Link',
  kind: 'tertiary',
  target: '#',
};
