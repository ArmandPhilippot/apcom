import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Field from './field';

/**
 * Field - Storybook Meta
 */
export default {
  title: 'Atoms/Forms/Fields',
  component: Field,
  args: {
    disabled: false,
    required: false,
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
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Field state: either enabled or disabled.',
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
      description: 'Field id.',
      type: {
        name: 'string',
        required: true,
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
      description: 'Field name.',
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
    required: {
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
    setValue: {
      control: {
        type: null,
      },
      description: 'Callback function to set field value.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: true,
      },
    },
    step: {
      control: {
        type: 'number',
      },
      description: 'Field incremental values that are valid.',
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
      description: 'Field type: input type or textarea.',
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
      description: 'Field value.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = ({
  value: _value,
  setValue: _setValue,
  ...args
}) => {
  const [value, setValue] = useState<string>('');

  return <Field value={value} setValue={setValue} {...args} />;
};

/**
 * Field Story - DateTime
 */
export const DateTime = Template.bind({});
DateTime.args = {
  id: 'field-storybook',
  name: 'field-storybook',
  type: 'datetime-local',
};

/**
 * Field Story - Email
 */
export const Email = Template.bind({});
Email.args = {
  id: 'field-storybook',
  name: 'field-storybook',
  type: 'email',
};

/**
 * Field Story - Text
 */
export const Text = Template.bind({});
Text.args = {
  id: 'field-storybook',
  name: 'field-storybook',
  type: 'text',
};

/**
 * Field Story - Number
 */
export const Number = Template.bind({});
Number.args = {
  id: 'field-storybook',
  name: 'field-storybook',
  type: 'number',
};

/**
 * Field Story - TextArea
 */
export const TextArea = Template.bind({});
TextArea.args = {
  id: 'field-storybook',
  name: 'field-storybook',
  type: 'textarea',
};

/**
 * Field Story - Time
 */
export const Time = Template.bind({});
Time.args = {
  id: 'field-storybook',
  name: 'field-storybook',
  type: 'time',
};
