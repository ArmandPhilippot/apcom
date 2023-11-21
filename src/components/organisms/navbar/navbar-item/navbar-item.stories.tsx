import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { NavbarItem } from './navbar-item';

/**
 * NavbarItem - Storybook Meta
 */
export default {
  title: 'Organisms/Navbar/Item',
  component: NavbarItem,
  argTypes: {},
} as ComponentMeta<typeof NavbarItem>;

const Template: ComponentStory<typeof NavbarItem> = (args) => (
  <NavbarItem {...args} />
);

/**
 * NavbarItem Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  children: 'The modal contents.',
  icon: 'cog',
  id: 'default',
  label: 'Open example',
};

/**
 * NavbarItem Stories - ModalVisibleAfterBreakpoint
 */
export const ModalVisibleAfterBreakpoint = Template.bind({});
ModalVisibleAfterBreakpoint.args = {
  children: 'The modal contents.',
  icon: 'cog',
  id: 'modal-visible',
  label: 'Open example',
  modalVisibleFrom: 'md',
};
