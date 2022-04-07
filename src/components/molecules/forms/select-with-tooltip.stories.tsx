import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import SelectWithTooltipComponent from './select-with-tooltip';

export default {
  title: 'Molecules/Forms',
  component: SelectWithTooltipComponent,
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
      description: 'The tooltip body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The tooltip title',
      type: {
        name: 'string',
        required: true,
      },
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'The select label.',
      type: {
        name: 'string',
        required: true,
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
} as ComponentMeta<typeof SelectWithTooltipComponent>;

const selectOptions = [
  { id: 'option1', name: 'Option 1', value: 'option1' },
  { id: 'option2', name: 'Option 2', value: 'option2' },
  { id: 'option3', name: 'Option 3', value: 'option3' },
];

const Template: ComponentStory<typeof SelectWithTooltipComponent> = ({
  value: _value,
  setValue: _setValue,
  ...args
}) => {
  const [selected, setSelected] = useState<string>('option1');
  return (
    <IntlProvider locale="en">
      <SelectWithTooltipComponent
        value={selected}
        setValue={setSelected}
        {...args}
      />
    </IntlProvider>
  );
};

export const SelectWithTooltip = Template.bind({});
SelectWithTooltip.args = {
  content: 'Illo voluptatibus quia minima placeat sit nostrum excepturi.',
  title: 'Possimus quidem dolor',
  id: 'storybook-select',
  label: 'Officiis:',
  name: 'storybook-select',
  options: selectOptions,
};
