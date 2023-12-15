import type { Meta, StoryObj } from '@storybook/react';
import type { FormEventHandler } from 'react';
import { SettingsForm } from './settings-form';

const meta = {
  component: SettingsForm,
  title: 'Organisms/Forms/Settings',
} satisfies Meta<typeof SettingsForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const doNothing: FormEventHandler = (e) => {
  e.preventDefault();

  return undefined;
};

export const Example: Story = {
  args: {
    onSubmit: doNothing,
  },
};
