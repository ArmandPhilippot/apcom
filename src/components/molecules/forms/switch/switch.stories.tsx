import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Switch as SwitchComponent, SwitchOption } from './switch';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { Legend } from '../../../atoms';

/**
 * Switch - Storybook Meta
 */
export default {
  title: 'Molecules/Forms',
  component: SwitchComponent,
  args: {},
  argTypes: {},
} as ComponentMeta<typeof SwitchComponent>;

const Template: ComponentStory<typeof SwitchComponent> = ({
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
    <SwitchComponent {...args} onSwitch={handleChange} value={selection} />
  );
};

const items: [SwitchOption, SwitchOption] = [
  { id: 'option-1', label: 'Choice 1', value: 'option-1' },
  { id: 'option-2', label: 'Choice 2', value: 'option-2' },
];

/**
 * Radio Group Story
 */
export const Switch = Template.bind({});
Switch.args = {
  items,
  legend: <Legend>Choose the best option:</Legend>,
  name: 'example',
  value: items[0].value,
};
