import type { Meta, StoryObj } from '@storybook/react';
import { Radio as RadioComponent } from './radio';

const meta = {
  component: RadioComponent,
  title: 'Atoms/Forms/Fields',
} satisfies Meta<typeof RadioComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Radio: Story = {
  args: {
    id: 'radio',
    isChecked: false,
    name: 'radio',
    value: 'radio',
  },
};
