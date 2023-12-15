import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, useState, useCallback } from 'react';
import { Select, type SelectOptions, type SelectProps } from './select';

const meta = {
  component: Select,
  title: 'Atoms/Forms/Fields/Select',
  excludeStories: /Controlled.*$/,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ControlledSelect = ({ multiple, ...args }: SelectProps) => {
  const [selected, setSelected] = useState(multiple === true ? [''] : '');
  const handler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (multiple)
        setSelected(
          Array.from(e.target.selectedOptions, (option) => option.value)
        );
      else setSelected(e.target.value);
    },
    [multiple]
  );

  return (
    <Select {...args} multiple={multiple} onChange={handler} value={selected} />
  );
};

const options = [
  { id: 'option-1', name: 'Option 1', value: 'option-1' },
  { id: 'option-2', name: 'Option 2', value: 'option-2' },
  { id: 'option-3', name: 'Option 3', value: 'option-3' },
  { id: 'option-4', name: 'Option 4', value: 'option-4' },
  { id: 'option-5', name: 'Option 5', value: 'option-5' },
] satisfies SelectOptions[];

const SelectTemplate: Story = {
  args: {
    isDisabled: false,
    isRequired: false,
    multiple: false,
    options,
    value: '',
  },
  render: ControlledSelect,
};

export const SingleChoice: Story = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
    'aria-label': 'Example of a default select field',
    options,
  },
};

export const MultipleChoices: Story = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
    'aria-label': 'Example of a select field with multiple choices',
    multiple: true,
    options,
  },
};

export const IsDisabled: Story = {
  ...SelectTemplate,
  name: 'State: Disabled',
  args: {
    ...SelectTemplate.args,
    'aria-label': 'Example of a disabled select field',
    isDisabled: true,
    options,
  },
};

export const IsRequired: Story = {
  ...SelectTemplate,
  name: 'State: Required',
  args: {
    ...SelectTemplate.args,
    'aria-label': 'Example of a required select field',
    isRequired: true,
    options,
  },
};
