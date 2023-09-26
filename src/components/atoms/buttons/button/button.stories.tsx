import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './button';

/**
 * Button - Storybook Meta
 */
export default {
  title: 'Atoms/Buttons/Button',
  component: Button,
  args: {
    type: 'button',
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The button body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
      description: 'Should the button be disabled?',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
      description:
        'Should the button be disabled because it is loading something?',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    isPressed: {
      control: {
        type: 'boolean',
      },
      description: 'Define if the button is currently pressed.',
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
      description: 'Button kind.',
      options: ['primary', 'secondary', 'tertiary', 'neutral'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'secondary' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    onClick: {
      control: {
        type: null,
      },
      description: 'A callback function to handle click.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
    shape: {
      control: {
        type: 'select',
      },
      description: 'The link shape.',
      options: ['circle', 'rectangle', 'square', 'initial'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'rectangle' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    type: {
      control: {
        type: 'select',
      },
      description: 'Button type attribute.',
      options: ['button', 'reset', 'submit'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'button' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const logClick = () => {
  console.log('Button has been clicked!');
};

/**
 * Button Story - Primary
 */
export const Primary = Template.bind({});
Primary.args = {
  children: 'Click on the button',
  kind: 'primary',
  onClick: logClick,
};

/**
 * Button Story - Secondary
 */
export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Click on the button',
  kind: 'secondary',
  onClick: logClick,
};

/**
 * Button Story - Tertiary
 */
export const Tertiary = Template.bind({});
Tertiary.args = {
  children: 'Click on the button',
  kind: 'tertiary',
  onClick: logClick,
};

/**
 * Button Story - Neutral
 */
export const Neutral = Template.bind({});
Neutral.args = {
  children: 'Click on the button',
  kind: 'neutral',
  onClick: logClick,
};
