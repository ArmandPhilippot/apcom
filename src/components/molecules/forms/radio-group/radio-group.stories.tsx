import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEventHandler, useCallback, useState } from 'react';
import { Legend } from '../../../atoms';
import { RadioGroup, type RadioGroupProps } from './radio-group';

const ControlledRadioGroup = ({ value, ...props }: RadioGroupProps) => {
  const [selection, setSelection] = useState(value);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSelection(e.target.value);
    },
    []
  );

  return <RadioGroup {...props} onSwitch={handleChange} value={selection} />;
};

const meta = {
  title: 'Molecules/Forms/Radio Group',
  component: RadioGroup,
  render: ControlledRadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    legend: <Legend>Select your preferred option:</Legend>,
    name: 'example',
    options: [
      { id: 'example-1', label: 'Option 1', value: 'example-1' },
      { id: 'example-2', label: 'Option 2', value: 'example-2' },
      { id: 'example-3', label: 'Option 3', value: 'example-3' },
    ],
  },
};

export const Inline: Story = {
  args: {
    ...Example.args,
    isInline: true,
    name: 'inline',
    options: [
      { id: 'inline-1', label: 'Option 1', value: 'inline-1' },
      { id: 'inline-2', label: 'Option 2', value: 'inline-2' },
      { id: 'inline-3', label: 'Option 3', value: 'inline-3' },
    ],
  },
};

export const DisabledGroup: Story = {
  args: {
    ...Example.args,
    isDisabled: true,
    name: 'disabled',
    options: [
      { id: 'disabled-1', label: 'Option 1', value: 'disabled-1' },
      { id: 'disabled-2', label: 'Option 2', value: 'disabled-2' },
      { id: 'disabled-3', label: 'Option 3', value: 'disabled-3' },
    ],
  },
};

export const DisabledOption: Story = {
  args: {
    ...Example.args,
    name: 'disabled-option',
    options: [
      { id: 'option-1', label: 'Option 1', value: 'option-1' },
      {
        id: 'option-2',
        isDisabled: true,
        label: 'Option 2',
        value: 'option-2',
      },
      { id: 'option-3', label: 'Option 3', value: 'option-3' },
    ],
  },
};

export const DefaultValue: Story = {
  args: {
    ...Example.args,
    name: 'default-value',
    options: [
      { id: 'value-1', label: 'Option 1', value: 'value-1' },
      { id: 'value-2', label: 'Option 2', value: 'value-2' },
      { id: 'value-3', label: 'Option 3', value: 'value-3' },
    ],
    value: 'value-2',
  },
};
