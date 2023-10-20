import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { NavItem } from '../nav-item';
import { NavLink } from '../nav-link';
import { NavList } from './nav-list';

/**
 * Nav - Storybook Meta
 */
export default {
  title: 'Molecules/Nav/NavList',
  component: NavList,
} as ComponentMeta<typeof NavList>;

const Template: ComponentStory<typeof NavList> = (args) => (
  <NavList {...args} />
);

const NavItems = () => (
  <>
    <NavItem>
      <NavLink href="#item1" label="Item 1" />
    </NavItem>
    <NavItem>
      <NavLink href="#item2" label="Item 2" />
    </NavItem>
    <NavItem>
      <NavLink href="#item3" label="Item 3" />
    </NavItem>
    <NavItem>
      <NavLink href="#item4" label="Item 4" />
    </NavItem>
  </>
);

/**
 * NavList Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  children: <NavItems />,
};

/**
 * NavList Stories - Inlined
 */
export const Inlined = Template.bind({});
Inlined.args = {
  children: <NavItems />,
  isInline: true,
  spacing: 'sm',
};
