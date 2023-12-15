import type { Meta, StoryObj } from '@storybook/react';
import { PrismThemeToggle } from './prism-theme-toggle';

const meta = {
  component: PrismThemeToggle,
  title: 'Organisms/Forms/Settings/Prism Theme',
} satisfies Meta<typeof PrismThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
