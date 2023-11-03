import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useBoolean } from '../../../../utils/hooks';
import { NavbarItem } from './navbar-item';

/**
 * NavbarItem - Storybook Meta
 */
export default {
  title: 'Organisms/Navbar/Item',
  component: NavbarItem,
  argTypes: {},
} as ComponentMeta<typeof NavbarItem>;

const Template: ComponentStory<typeof NavbarItem> = ({
  isActive,
  onDeactivate,
  onToggle,
  ...args
}) => {
  const { deactivate, state, toggle } = useBoolean(isActive);

  return (
    <NavbarItem
      {...args}
      isActive={state}
      onDeactivate={deactivate}
      onToggle={toggle}
    />
  );
};

/**
 * NavbarItem Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  children: 'The modal contents.',
  icon: 'cog',
  id: 'default',
  isActive: false,
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
  isActive: false,
  label: 'Open example',
  modalVisibleFrom: 'md',
};
