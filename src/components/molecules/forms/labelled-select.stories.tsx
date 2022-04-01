import { ComponentMeta, ComponentStory } from '@storybook/react';
import LabelledSelectComponent from './labelled-select';

const selectOptions = [
  { id: 'option1', name: 'Option 1', value: 'option1' },
  { id: 'option2', name: 'Option 2', value: 'option2' },
  { id: 'option3', name: 'Option 3', value: 'option3' },
];

export default {
  title: 'Molecules/Forms',
  component: LabelledSelectComponent,
  args: {
    disabled: false,
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
} as ComponentMeta<typeof LabelledSelectComponent>;

const Template: ComponentStory<typeof LabelledSelectComponent> = (args) => (
  <LabelledSelectComponent {...args} />
);

export const LabelledSelect = Template.bind({});
LabelledSelect.args = {
  id: 'labelled-select-storybook',
  label: 'Labelled select',
  name: 'labelled-select-storybook',
  options: selectOptions,
  setValue: () => null,
  value: '',
};
