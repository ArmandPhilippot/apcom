import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { type ChangeEvent, useCallback, useState } from 'react';
import { Input } from './input';

/**
 * Input - Storybook Meta
 */
export default {
  title: 'Atoms/Forms/Fields',
  component: Input,
  args: {
    isDisabled: false,
    isRequired: false,
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
    className: {
      control: {
        type: 'text',
      },
      description: 'Add classnames to the field.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    id: {
      control: {
        type: 'text',
      },
      description: 'Input id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
      description: 'Input state: either enabled or disabled.',
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
      description: 'Determine if the field is required.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    max: {
      control: {
        type: 'number',
      },
      description: 'Maximum value.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'number',
        required: false,
      },
    },
    min: {
      control: {
        type: 'number',
      },
      description: 'Minimum value.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'number',
        required: false,
      },
    },
    name: {
      control: {
        type: 'text',
      },
      description: 'Input name.',
      type: {
        name: 'string',
        required: true,
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'A placeholder value.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    step: {
      control: {
        type: 'number',
      },
      description: 'Input incremental values that are valid.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'number',
        required: false,
      },
    },
    type: {
      control: {
        type: 'select',
      },
      description: 'Input type: input type or textarea.',
      options: [
        'datetime-local',
        'email',
        'number',
        'search',
        'tel',
        'text',
        'textarea',
        'time',
        'url',
      ],
      type: {
        name: 'string',
        required: true,
      },
    },
    value: {
      control: {
        type: null,
      },
      description: 'Input value.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = ({
  value: initialValue,
  onChange: _onChange,
  ...args
}) => {
  const [value, setValue] = useState(initialValue);
  const updateValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return <Input value={value} onChange={updateValue} {...args} />;
};

/**
 * Input Story - DateTimeField
 */
export const DateTimeField = Template.bind({});
DateTimeField.args = {
  id: 'field-storybook',
  name: 'field-storybook',
  type: 'datetime-local',
};

/**
 * Input Story - EmailField
 */
export const EmailField = Template.bind({});
EmailField.args = {
  id: 'field-storybook',
  name: 'field-storybook',
  type: 'email',
};

/**
 * Input Story - NumericField
 */
export const NumericField = Template.bind({});
NumericField.args = {
  id: 'field-storybook',
  name: 'field-storybook',
  type: 'number',
};

/**
 * Input Story - TextField
 */
export const TextField = Template.bind({});
TextField.args = {
  id: 'field-storybook',
  name: 'field-storybook',
  type: 'text',
};

/**
 * Input Story - TimeField
 */
export const TimeField = Template.bind({});
TimeField.args = {
  id: 'field-storybook',
  name: 'field-storybook',
  type: 'time',
};
