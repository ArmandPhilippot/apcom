import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import ToggleComponent from './toggle';

export default {
  title: 'Molecules/Forms',
  component: ToggleComponent,
  argTypes: {
    choices: {
      description: 'The toggle choices.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    id: {
      control: {
        type: 'text',
      },
      description: 'The input id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'The toggle label.',
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
      description: 'The input name.',
      type: {
        name: 'string',
        required: true,
      },
    },
    setValue: {
      control: {
        type: null,
      },
      description: 'A callback function to update the toggle value.',
      type: {
        name: 'function',
        required: true,
      },
    },
    value: {
      control: {
        type: null,
      },
      description: 'The toggle value. True if checked.',
      type: {
        name: 'boolean',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof ToggleComponent>;

const Template: ComponentStory<typeof ToggleComponent> = ({
  value: _value,
  setValue: _setValue,
  ...args
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <ToggleComponent value={isChecked} setValue={setIsChecked} {...args} />
  );
};

export const Toggle = Template.bind({});
Toggle.args = {
  choices: {
    left: 'On',
    right: 'Off',
  },
  id: 'toggle-example',
  label: 'Activate setting:',
  name: 'toggle-example',
};