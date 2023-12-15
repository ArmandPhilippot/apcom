import { useArgs } from '@storybook/client-api';
import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, useCallback } from 'react';
import { TextArea, type TextAreaProps } from './text-area';

const meta = {
  component: TextArea,
  title: 'Atoms/Forms/Fields/TextArea',
  excludeStories: /Controlled.*$/,
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ControlledTextArea = ({ value, ...args }: TextAreaProps) => {
  const [_, updateArgs] = useArgs<TextAreaProps>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      updateArgs({ ...args, value: e.target.value });
    },
    [args, updateArgs]
  );

  return <TextArea {...args} onChange={handleChange} value={value} />;
};

const TextAreaTemplate: Story = {
  args: {
    id: 'default',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    name: 'default',
    value: '',
  },
  render: ControlledTextArea,
};

export const IsEditable: Story = {
  ...TextAreaTemplate,
  name: 'State: Editable',
  args: {
    ...TextAreaTemplate.args,
    'aria-label': 'Example of a default text area',
    id: 'disabled',
    name: 'disabled',
  },
};

export const IsDisabled: Story = {
  ...TextAreaTemplate,
  name: 'State: Disabled',
  args: {
    ...TextAreaTemplate.args,
    'aria-label': 'Example of a disabled text area',
    id: 'disabled',
    isDisabled: true,
    name: 'disabled',
  },
};

export const IsReadOnly: Story = {
  ...TextAreaTemplate,
  name: 'State: Readonly',
  args: {
    ...TextAreaTemplate.args,
    'aria-label': 'Example of a read-only text area',
    id: 'readonly',
    isReadOnly: true,
    name: 'readonly',
  },
};

export const IsRequired: Story = {
  ...TextAreaTemplate,
  name: 'State: Required',
  args: {
    ...TextAreaTemplate.args,
    'aria-label': 'Example of a required text area',
    id: 'required',
    isRequired: true,
    name: 'required',
  },
};
