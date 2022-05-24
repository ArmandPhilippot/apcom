import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from './button';

/**
 * Button - Storybook Meta
 */
export default {
  title: 'Atoms/Buttons/Button',
  component: Button,
  args: {
    disabled: false,
    type: 'button',
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
      description: 'The button body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the button wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Render button as disabled.',
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

const Template: ComponentStory<typeof Button> = (args) => {
  const { children, type, ...props } = args;

  const getBody = () => {
    if (children) return children;

    switch (type) {
      case 'reset':
        return 'Reset';
      case 'submit':
        return 'Submit';
      case 'button':
      default:
        return 'Button';
    }
  };

  return (
    <Button type={type} {...props}>
      {getBody()}
    </Button>
  );
};

/**
 * Button Story - Primary
 */
export const Primary = Template.bind({});
Primary.args = {
  kind: 'primary',
};

/**
 * Button Story - Secondary
 */
export const Secondary = Template.bind({});
Secondary.args = {
  kind: 'secondary',
};

/**
 * Button Story - Tertiary
 */
export const Tertiary = Template.bind({});
Tertiary.args = {
  kind: 'tertiary',
};
