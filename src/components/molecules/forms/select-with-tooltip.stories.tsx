import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import SelectWithTooltip from './select-with-tooltip';

/**
 * SelectWithTooltip - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Select',
  component: SelectWithTooltip,
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
      description: 'The select label.',
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
    tooltipClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the tooltip.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
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
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
} as ComponentMeta<typeof SelectWithTooltip>;

const selectOptions = [
  { id: 'option1', name: 'Option 1', value: 'option1' },
  { id: 'option2', name: 'Option 2', value: 'option2' },
  { id: 'option3', name: 'Option 3', value: 'option3' },
];

const Template: ComponentStory<typeof SelectWithTooltip> = ({
  value: _value,
  setValue: _setValue,
  ...args
}) => {
  const [selected, setSelected] = useState<string>('option1');
  return (
    <SelectWithTooltip value={selected} setValue={setSelected} {...args} />
  );
};

/**
 * Select Stories - With tooltip
 */
export const WithTooltip = Template.bind({});
WithTooltip.args = {
  content: 'Illo voluptatibus quia minima placeat sit nostrum excepturi.',
  title: 'Possimus quidem dolor',
  id: 'storybook-select',
  label: 'Officiis:',
  name: 'storybook-select',
  options: selectOptions,
};
