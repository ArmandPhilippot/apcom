import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { type ChangeEventHandler, useCallback, useState } from 'react';
import { Legend } from '../../../atoms';
import { RadioGroup as RadioGroupComponent } from './radio-group';
import { getOptions, initialChoice } from './radio-group.fixture';

/**
 * RadioGroup - Storybook Meta
 */
export default {
  title: 'Molecules/Forms',
  component: RadioGroupComponent,
  args: {},
  argTypes: {
    onChange: {
      control: {
        type: null,
      },
      description: 'A callback function to handle selected option change.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
    options: {
      description: 'An array of radio option object.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    value: {
      control: {
        type: 'text',
      },
      description: 'The default selected option id.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof RadioGroupComponent>;

const Template: ComponentStory<typeof RadioGroupComponent> = ({
  value,
  ...args
}) => {
  const [selection, setSelection] = useState(value);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSelection(e.target.value);
    },
    []
  );

  return (
    <RadioGroupComponent {...args} onSwitch={handleChange} value={selection} />
  );
};

/**
 * Radio Group Story
 */
export const RadioGroup = Template.bind({});
RadioGroup.args = {
  legend: <Legend>Options:</Legend>,
  options: getOptions('group1'),
  value: initialChoice,
};
