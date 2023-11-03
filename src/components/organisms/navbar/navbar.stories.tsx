import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Navbar as NavbarComponent } from './navbar';

/**
 * Navbar - Storybook Meta
 */
export default {
  title: 'Organisms/Navbar',
  component: NavbarComponent,
  args: {
    searchPage: '#',
  },
  argTypes: {
    nav: {
      description: 'The main nav items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    searchPage: {
      control: {
        type: 'text',
      },
      description: 'The search results page url.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof NavbarComponent>;

const Template: ComponentStory<typeof NavbarComponent> = (args) => (
  <NavbarComponent {...args} />
);

const doNothing = () => {
  // do nothing;
};

/**
 * Navbar Stories - With all items inactive
 */
export const NavbarInactiveItems = Template.bind({});
NavbarInactiveItems.args = {
  items: [
    {
      icon: 'hamburger',
      id: 'main-nav',
      isActive: false,
      label: 'Nav',
      contents: 'Main nav contents',
      onToggle: doNothing,
    },
    {
      icon: 'magnifying-glass',
      id: 'search',
      isActive: false,
      label: 'Search',
      contents: 'Search contents',
      onToggle: doNothing,
    },
    {
      icon: 'cog',
      id: 'settings',
      isActive: false,
      label: 'Settings',
      contents: 'Settings contents',
      onToggle: doNothing,
    },
  ],
};

/**
 * Navbar Stories - With one item active
 */
export const NavbarActiveItem = Template.bind({});
NavbarActiveItem.args = {
  items: [
    {
      icon: 'hamburger',
      id: 'main-nav',
      isActive: true,
      label: 'Nav',
      contents: 'Main nav contents',
      onToggle: doNothing,
    },
    {
      icon: 'magnifying-glass',
      id: 'search',
      isActive: false,
      label: 'Search',
      contents: 'Search contents',
      onToggle: doNothing,
    },
    {
      icon: 'cog',
      id: 'settings',
      isActive: false,
      label: 'Settings',
      contents: 'Settings contents',
      onToggle: doNothing,
    },
  ],
};
