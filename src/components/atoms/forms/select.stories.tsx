import { ComponentMeta, ComponentStory } from '@storybook/react';
import SelectComponent from './select';

const selectOptions = [
  { id: 'option1', name: 'Option 1', value: 'option1' },
  { id: 'option2', name: 'Option 2', value: 'option2' },
  { id: 'option3', name: 'Option 3', value: 'option3' },
];

export default {
  title: 'Atoms/Forms',
  component: SelectComponent,
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
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
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
        type: 'text',
      },
      description: 'Field value.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = (args) => (
  <SelectComponent {...args} />
);

export const Select = Template.bind({});
Select.args = {
  options: selectOptions,
  setValue: () => null,
  value: 'option2',
};
