import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import CheckboxComponent from './checkbox';

export default {
  title: 'Atoms/Forms',
  component: CheckboxComponent,
  argTypes: {
    'aria-labelledby': {
      control: {
        type: 'text',
      },
      description: 'One or more ids that refers to the checkbox name.',
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
      description: 'Set additional classnames to the checkbox.',
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
      description: 'The checkbox id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    name: {
      control: {
        type: 'text',
      },
      description: 'The checkbox name.',
      type: {
        name: 'string',
        required: true,
      },
    },
    setValue: {
      control: {
        type: null,
      },
      description: 'A callback function to handle checkbox state.',
      type: {
        name: 'function',
        required: true,
      },
    },
    value: {
      control: {
        type: null,
      },
      description:
        'The checkbox state: either checked (true) or unchecked (false).',
      type: {
        name: 'boolean',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof CheckboxComponent>;

const Template: ComponentStory<typeof CheckboxComponent> = ({
  value,
  setValue: _setValue,
  ...args
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(value);

  return (
    <CheckboxComponent value={isChecked} setValue={setIsChecked} {...args} />
  );
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  id: 'storybook-checkbox',
  name: 'storybook-checkbox',
  value: false,
};
