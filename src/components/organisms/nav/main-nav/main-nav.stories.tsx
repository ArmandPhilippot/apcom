import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../../atoms';
import { MainNav } from './main-nav';

const meta = {
  component: MainNav,
  title: 'Organisms/Nav/MainNav',
} satisfies Meta<typeof MainNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'blog', label: 'Blog', href: '#blog' },
      { id: 'projects', label: 'Projects', href: '#projects' },
      { id: 'contact', label: 'Contact', href: '#contact' },
    ],
  },
};

export const WithLogo: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        href: '#home',
        logo: <Icon aria-hidden shape="home" />,
      },
      {
        id: 'blog',
        label: 'Blog',
        href: '#blog',
        logo: <Icon aria-hidden shape="posts-stack" />,
      },
      {
        id: 'projects',
        label: 'Projects',
        href: '#projects',
        logo: <Icon aria-hidden shape="computer" />,
      },
      {
        id: 'contact',
        label: 'Contact',
        href: '#contact',
        logo: <Icon aria-hidden shape="envelop" />,
      },
    ],
  },
};
