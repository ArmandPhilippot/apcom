import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from './collapsible';

const meta = {
  component: Collapsible,
  title: 'Molecules/Collapsible',
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

const heading = 'Your title';
const body =
  'Eius et eum ex voluptas laboriosam aliquid quas necessitatibus. Molestiae eius voluptatem qui voluptas eaque et totam. Ut ipsum ea sit. Quos molestiae id est consequatur. Suscipit illo at. Omnis non suscipit. Qui itaque laboriosam quos ut est laudantium. Iusto recusandae excepturi quia labore voluptatem quod recusandae. Quod ducimus ut rem dolore et.';

export const Collapsed: Story = {
  args: {
    children: body,
    heading,
    isCollapsed: true,
  },
};

export const Expanded: Story = {
  args: {
    children: body,
    heading,
    isCollapsed: false,
  },
};
