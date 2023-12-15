import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../fields';
import { Fieldset, type FieldsetProps } from './fieldset';

const meta = {
  component: Fieldset,
  title: 'Atoms/Forms/Fieldset',
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

const FieldsetWithFields = ({
  inputLabel,
  ...props
}: FieldsetProps & { inputLabel: string }) => (
  <Fieldset {...props}>
    <Input aria-label={inputLabel} id="field" name="field" type="text" />
  </Fieldset>
);

type WithFieldStory = StoryObj<FieldsetProps & { inputLabel: string }>;

export const Enabled: WithFieldStory = {
  name: 'State: Enabled',
  args: {
    ...Default.args,
    inputLabel: 'Example of a field inside an enabled fieldset',
    isDisabled: false,
  },
  render: FieldsetWithFields,
};

export const Disabled: WithFieldStory = {
  name: 'State: Disabled',
  args: {
    ...Default.args,
    inputLabel: 'Example of a field inside a disabled fieldset',
    isDisabled: true,
  },
  render: FieldsetWithFields,
};
