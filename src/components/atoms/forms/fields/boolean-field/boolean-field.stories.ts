import type { Meta, StoryObj } from '@storybook/react';
import { BooleanField } from './boolean-field';

const meta = {
  component: BooleanField,
  title: 'Atoms/Forms/Fields/BooleanField',
} satisfies Meta<typeof BooleanField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {
    id: 'checkbox',
    isChecked: false,
    name: 'checkbox',
    type: 'checkbox',
    value: 'checkbox',
  },
};

export const Radio: Story = {
  args: {
    id: 'radio',
    isChecked: false,
    name: 'radio',
    type: 'radio',
    value: 'radio',
  },
};
