import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { BooleanField } from './boolean-field';

/**
 * BooleanField - Storybook Meta
 */
export default {
  title: 'Atoms/Forms',
  component: BooleanField,
  args: {
    hidden: false,
  },
  argTypes: {
    'aria-labelledby': {
      control: {
        type: 'text',
      },
      description: 'One or more ids that refers to the field name.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    checked: {
      control: {
        type: null,
      },
      description: 'The field state: true if checked.',
      type: {
        name: 'boolean',
        required: true,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the field.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    hidden: {
      control: {
        type: 'boolean',
      },
      description: 'Define if the field should be visually hidden.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    id: {
      control: {
        type: 'text',
      },
      description: 'The field id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    name: {
      control: {
        type: 'text',
      },
      description: 'The field name.',
      type: {
        name: 'string',
        required: true,
      },
    },
    onChange: {
      control: {
        type: null,
      },
      description: 'A callback function to handle field state change.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: true,
      },
    },
    onClick: {
      control: {
        type: null,
      },
      description: 'A callback function to handle click on field.',
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
      description: 'The field type. Either checkbox or radio.',
      options: ['checkbox', 'radio'],
      type: {
        name: 'string',
        required: true,
      },
    },
    value: {
      control: {
        type: 'text',
      },
      description: 'The field value.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof BooleanField>;

const Template: ComponentStory<typeof BooleanField> = ({
  checked,
  onChange: _onChange,
  ...args
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  return (
    <BooleanField
      checked={isChecked}
      onChange={() => {
        setIsChecked(!isChecked);
      }}
      {...args}
    />
  );
};

/**
 * Checkbox Story
 */
export const Checkbox = Template.bind({});
Checkbox.args = {
  id: 'checkbox',
  checked: false,
  name: 'checkbox',
  type: 'checkbox',
  value: 'checkbox',
};

/**
 * Radio Story
 */
export const Radio = Template.bind({});
Radio.args = {
  id: 'radio',
  checked: false,
  name: 'radio',
  type: 'radio',
  value: 'radio',
};
