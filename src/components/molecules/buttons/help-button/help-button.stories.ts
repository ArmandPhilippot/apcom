import type { Meta, StoryObj } from '@storybook/react';
import { HelpButton } from './help-button';

const meta = {
  component: HelpButton,
  title: 'Molecules/Buttons/Help',
} satisfies Meta<typeof HelpButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: 'Help',
  },
};
