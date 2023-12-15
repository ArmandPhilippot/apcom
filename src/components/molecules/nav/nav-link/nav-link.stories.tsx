import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../../atoms';
import { NavLink, type NavLinkProps } from './nav-link';

const WrappedNavLink = (args: NavLinkProps) => (
  <div style={{ width: 'fit-content' }}>
    <NavLink {...args} />
  </div>
);

const meta = {
  component: NavLink,
  title: 'Molecules/Nav/Link',
  render: WrappedNavLink,
} satisfies Meta<typeof NavLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: {
    href: '#',
    label: 'A nav link',
  },
};

export const RegularInlineWithLogo: Story = {
  args: {
    href: '#example',
    isStack: false,
    label: 'A nav link',
    logo: <Icon aria-hidden shape="home" />,
  },
};

export const RegularStackWithLogo: Story = {
  args: {
    href: '#example',
    isStack: true,
    label: 'A nav link',
    logo: <Icon aria-hidden shape="home" />,
  },
};

export const Block: Story = {
  args: {
    href: '#',
    label: 'A nav link',
    variant: 'block',
  },
};

export const BlockInlineWithLogo: Story = {
  args: {
    href: '#example',
    isStack: false,
    label: 'A nav link',
    logo: <Icon aria-hidden shape="home" />,
    variant: 'block',
  },
};

export const BlockStackWithLogo: Story = {
  args: {
    href: '#example',
    isStack: true,
    label: 'A nav link',
    logo: <Icon aria-hidden shape="home" />,
    variant: 'block',
  },
};

export const Main: Story = {
  args: {
    href: '#',
    label: 'A nav link',
    variant: 'main',
  },
};

export const MainInlineWithLogo: Story = {
  args: {
    href: '#example',
    isStack: false,
    label: 'A nav link',
    logo: <Icon aria-hidden shape="home" />,
    variant: 'main',
  },
};

export const MainStackWithLogo: Story = {
  args: {
    href: '#example',
    isStack: true,
    label: 'A nav link',
    logo: <Icon aria-hidden shape="home" />,
    variant: 'main',
  },
};
