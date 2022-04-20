import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import LabelledField from './labelled-field';

/**
 * LabelledField - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Field',
  component: LabelledField,
  args: {
    disabled: false,
    labelPosition: 'top',
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
      description: 'Set additional classnames to the field.',
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
    hideLabel: {
      control: {
        type: 'boolean',
      },
      description: 'Visually hide the field label.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
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
} as ComponentMeta<typeof LabelledField>;

const Template: ComponentStory<typeof LabelledField> = ({
  value: _value,
  setValue: _setValue,
  ...args
}) => {
  const [value, setValue] = useState<string>('');

  return <LabelledField value={value} setValue={setValue} {...args} />;
};

/**
 * Labelled Field Stories - Left
 */
export const Left = Template.bind({});
Left.args = {
  id: 'labelled-field-storybook',
  label: 'Labelled field',
  labelPosition: 'left',
  name: 'labelled-field-storybook',
};

/**
 * Labelled Field Stories - Top
 */
export const Top = Template.bind({});
Top.args = {
  id: 'labelled-field-storybook',
  label: 'Labelled field',
  labelPosition: 'top',
  name: 'labelled-field-storybook',
};

/**
 * Labelled Field Stories - Required
 */
export const Required = Template.bind({});
Required.args = {
  id: 'labelled-field-storybook',
  label: 'Labelled field',
  name: 'labelled-field-storybook',
  required: true,
};

/**
 * Labelled Field Stories - Hidden label
 */
export const HiddenLabel = Template.bind({});
HiddenLabel.args = {
  hideLabel: true,
  id: 'labelled-field-storybook',
  label: 'Labelled field',
  name: 'labelled-field-storybook',
};

/**
 * Labelled Field Stories - Disabled
 */
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  id: 'labelled-field-storybook',
  label: 'Labelled field',
  name: 'labelled-field-storybook',
};
