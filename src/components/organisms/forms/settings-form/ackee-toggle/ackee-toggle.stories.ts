import type { Meta, StoryObj } from '@storybook/react';
import { AckeeToggle } from './ackee-toggle';

const meta = {
  component: AckeeToggle,
  title: 'Organisms/Forms/Settings/Ackee',
} satisfies Meta<typeof AckeeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
