import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import LabelledSelect from './labelled-select';

const selectOptions = [
  { id: 'option1', name: 'Option 1', value: 'option1' },
  { id: 'option2', name: 'Option 2', value: 'option2' },
  { id: 'option3', name: 'Option 3', value: 'option3' },
];

/**
 * LabelledSelect - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Select',
  component: LabelledSelect,
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
    labelClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the label.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
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
    labelSize: {
      control: {
        type: 'select',
      },
      description: 'The label size.',
      options: ['medium', 'small'],
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
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
    options: {
      control: {
        type: null,
      },
      description: 'Select options.',
      type: {
        name: 'array',
        required: true,
        value: {
          name: 'string',
        },
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
    selectClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the select field.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
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
} as ComponentMeta<typeof LabelledSelect>;

const Template: ComponentStory<typeof LabelledSelect> = ({
  value,
  setValue: _setValue,
  ...args
}) => {
  const [selected, setSelected] = useState<string>(value);

  return <LabelledSelect value={selected} setValue={setSelected} {...args} />;
};

/**
 * Labelled Select Stories - Left
 */
export const Left = Template.bind({});
Left.args = {
  id: 'labelled-select-storybook',
  label: 'Labelled select',
  labelPosition: 'left',
  name: 'labelled-select-storybook',
  options: selectOptions,
  value: 'option1',
};

/**
 * Labelled Select Stories - Top
 */
export const Top = Template.bind({});
Top.args = {
  id: 'labelled-select-storybook',
  label: 'Labelled select',
  labelPosition: 'top',
  name: 'labelled-select-storybook',
  options: selectOptions,
  value: 'option1',
};

/**
 * Labelled Select Stories - Disabled
 */
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  id: 'labelled-select-storybook',
  label: 'Labelled select',
  name: 'labelled-select-storybook',
  options: selectOptions,
  value: 'option1',
};

/**
 * Labelled Select Stories - Required
 */
export const Required = Template.bind({});
Required.args = {
  id: 'labelled-select-storybook',
  label: 'Labelled select',
  labelPosition: 'top',
  name: 'labelled-select-storybook',
  options: selectOptions,
  required: true,
  value: 'option1',
};
