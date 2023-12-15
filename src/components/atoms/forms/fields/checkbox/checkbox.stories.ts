import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox as CheckboxComponent } from './checkbox';

const meta = {
  component: CheckboxComponent,
  title: 'Atoms/Forms/Fields',
} satisfies Meta<typeof CheckboxComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {
    id: 'checkbox',
    isChecked: false,
    name: 'checkbox',
    value: 'checkbox',
  },
};
