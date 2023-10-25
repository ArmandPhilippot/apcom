import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from '../../../atoms';
import { MainNav } from './main-nav';

/**
 * MainNav - Storybook Meta
 */
export default {
  title: 'Organisms/Nav/MainNav',
  component: MainNav,
  argTypes: {
    items: {
      description: 'The main nav items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof MainNav>;

const Template: ComponentStory<typeof MainNav> = (args) => (
  <MainNav {...args} />
);

/**
 * MainNav Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  items: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'blog', label: 'Blog', href: '#blog' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],
};

/**
 * MainNav Stories - WithLogo
 */
export const WithLogo = Template.bind({});
WithLogo.args = {
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
};
