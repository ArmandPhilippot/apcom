import { ComponentMeta, ComponentStory } from '@storybook/react';
import ButtonComponent from './button';

export default {
  title: 'Atoms/Buttons',
  component: ButtonComponent,
  args: {
    disabled: false,
    kind: 'secondary',
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
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => {
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
    <ButtonComponent type={type} {...props}>
      {getBody()}
    </ButtonComponent>
  );
};

export const Button = Template.bind({});
