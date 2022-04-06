import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import ToggleComponent from './toggle';

export default {
  title: 'Atoms/Forms',
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
