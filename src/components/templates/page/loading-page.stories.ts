import type { Meta, StoryObj } from '@storybook/react';
import { LoadingPage } from './loading-page';

const meta = {
  component: LoadingPage,
  title: 'Templates/Page/LoadingPage',
} satisfies Meta<typeof LoadingPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
