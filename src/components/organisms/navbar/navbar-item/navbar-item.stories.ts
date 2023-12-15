import type { Meta, StoryObj } from '@storybook/react';
import { NavbarItem } from './navbar-item';

const meta = {
  component: NavbarItem,
  title: 'Organisms/Navbar/Item',
} satisfies Meta<typeof NavbarItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'The modal contents.',
    icon: 'cog',
    id: 'default',
    label: 'Open example',
  },
};

export const ModalVisibleAfterBreakpoint: Story = {
  args: {
    children: 'The modal contents.',
    icon: 'cog',
    id: 'modal-visible',
    label: 'Open example',
    modalVisibleFrom: 'md',
  },
};
