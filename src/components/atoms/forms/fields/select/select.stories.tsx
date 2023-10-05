import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { type ChangeEvent, useCallback, useState } from 'react';
import { Select as SelectComponent } from './select';

const selectOptions = [
  { id: 'option1', name: 'Option 1', value: 'option1' },
  { id: 'option2', name: 'Option 2', value: 'option2' },
  { id: 'option3', name: 'Option 3', value: 'option3' },
];

/**
 * Select - Storybook Meta
 */
export default {
  title: 'Atoms/Forms/Fields',
  component: SelectComponent,
  args: {
    isDisabled: false,
    isRequired: false,
  },
  argTypes: {
    'aria-labelledby': {
      control: {
        type: 'text',
      },
      description: 'One or more ids that refers to the select field name.',
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
      description: 'Add classnames to the select field.',
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
      description: 'Field id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    isDisabled: {
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
      description: 'Select options.',
      type: {
        name: 'array',
        required: true,
        value: {
          name: 'string',
        },
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
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = ({
  onChange: _onChange,
  value,
  ...args
}) => {
  const [selected, setSelected] = useState(value);
  const updateSelection = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  }, []);

  return (
    <SelectComponent {...args} onChange={updateSelection} value={selected} />
  );
};

/**
 * Select Story
 */
export const Select = Template.bind({});
Select.args = {
  id: 'storybook-select',
  name: 'storybook-select',
  options: selectOptions,
  value: 'option2',
};
