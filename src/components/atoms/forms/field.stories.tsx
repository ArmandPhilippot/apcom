import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import FieldComponent from './field';

export default {
  title: 'Atoms/Forms',
  component: FieldComponent,
  args: {
    disabled: false,
    required: false,
    type: 'text',
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
} as ComponentMeta<typeof FieldComponent>;

const Template: ComponentStory<typeof FieldComponent> = ({
  value: _value,
  setValue: _setValue,
  ...args
}) => {
  const [value, setValue] = useState<string>('');

  return <FieldComponent value={value} setValue={setValue} {...args} />;
};

export const Field = Template.bind({});
Field.args = {
  id: 'field-storybook',
  name: 'field-storybook',
};
