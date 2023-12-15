import type { Meta, StoryObj } from '@storybook/react';
import { BackToTop } from './back-to-top';

const meta = {
  component: BackToTop,
  title: 'Molecules/Buttons/BackToTop',
} satisfies Meta<typeof BackToTop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    anchor: '#top',
    label: 'Back to top',
  },
};
