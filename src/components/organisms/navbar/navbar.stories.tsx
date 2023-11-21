import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Navbar as NavbarComponent } from './navbar';
import { NavbarItem } from './navbar-item';

/**
 * Navbar - Storybook Meta
 */
export default {
  title: 'Organisms/Navbar',
  component: NavbarComponent,
  argTypes: {
    children: {
      description: 'The navbar items.',
      type: {
        name: 'object',
        required: true,
        value: {},
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

/**
 * Navbar Stories - 1 item
 */
export const OneItem = Template.bind({});
OneItem.args = {
  children: (
    <NavbarItem icon="hamburger" id="main-nav" label="Nav">
      The main nav contents
    </NavbarItem>
  ),
};

/**
 * Navbar Stories - 2 items
 */
export const TwoItems = Template.bind({});
TwoItems.args = {
  children: (
    <>
      <NavbarItem icon="hamburger" id="main-nav" label="Nav">
        The main nav contents
      </NavbarItem>
      <NavbarItem icon="magnifying-glass" id="search" label="Search">
        A search form
      </NavbarItem>
    </>
  ),
};

/**
 * Navbar Stories - 3 items
 */
export const ThreeItems = Template.bind({});
ThreeItems.args = {
  children: (
    <>
      <NavbarItem icon="hamburger" id="main-nav" label="Nav">
        The main nav contents
      </NavbarItem>
      <NavbarItem icon="magnifying-glass" id="search" label="Search">
        A search form
      </NavbarItem>
      <NavbarItem icon="cog" id="settings" label="Settings">
        A settings form
      </NavbarItem>
    </>
  ),
};
