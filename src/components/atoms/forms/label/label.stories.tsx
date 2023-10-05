import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Label as LabelComponent } from './label';

/**
 * Label - Storybook Meta
 */
export default {
  title: 'Atoms/Forms',
  component: LabelComponent,
  args: {
    isHidden: false,
    isRequired: false,
    size: 'sm',
  },
  argTypes: {
    'aria-label': {
      control: {
        type: 'text',
      },
      description: 'Define an accessible name.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Add classnames to the label.',
      table: {
        category: 'Styles',
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
      description: 'The label body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    htmlFor: {
      control: {
        type: 'text',
      },
      description: 'The field id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    isHidden: {
      control: {
        type: 'boolean',
      },
      description: 'Set to true if the label should be visually hidden.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
      description: 'Set to true if the field is required.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    size: {
      control: {
        type: 'select',
      },
      description: 'The label size.',
      options: ['md', 'sm'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'sm' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof LabelComponent>;

const Template: ComponentStory<typeof LabelComponent> = ({
  children,
  ...args
}) => <LabelComponent {...args}>{children}</LabelComponent>;

/**
 * Label Story
 */
export const Label = Template.bind({});
Label.args = {
  children: 'A label',
};
