import type { Meta, StoryObj } from '@storybook/react';
import { MotionToggle } from './motion-toggle';

const meta = {
  component: MotionToggle,
  title: 'Organisms/Forms/Settings/Motion',
} satisfies Meta<typeof MotionToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
