import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import LabelledFieldComponent from './labelled-field';

export default {
  title: 'Molecules/Forms',
  component: LabelledFieldComponent,
  args: {
    disabled: false,
    labelPosition: 'top',
    required: false,
  },
  argTypes: {
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
    label: {
      control: {
        type: 'text',
      },
      description: 'Field label.',
      type: {
        name: 'string',
        required: true,
      },
    },
    labelPosition: {
      control: {
        type: 'select',
      },
      description: 'The label position.',
      options: ['left', 'top'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'top' },
      },
      type: {
        name: 'string',
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
} as ComponentMeta<typeof LabelledFieldComponent>;

const Template: ComponentStory<typeof LabelledFieldComponent> = ({
  value: _value,
  setValue: _setValue,
  ...args
}) => {
  const [value, setValue] = useState<string>('');

  return <LabelledFieldComponent value={value} setValue={setValue} {...args} />;
};

export const LabelledField = Template.bind({});
LabelledField.args = {
  id: 'labelled-field-storybook',
  label: 'Labelled field',
  name: 'labelled-field-storybook',
};
