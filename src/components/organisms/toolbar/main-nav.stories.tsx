import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useCallback, useState } from 'react';
import { MainNavItem } from './main-nav';

/**
 * MainNavItem - Storybook Meta
 */
export default {
  title: 'Organisms/Toolbar/MainNavItem',
  component: MainNavItem,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the main nav wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    isActive: {
      control: {
        type: null,
      },
      description: 'Determine if the main nav is open or not.',
      type: {
        name: 'boolean',
        required: true,
      },
    },
    items: {
      description: 'The main nav items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    setIsActive: {
      control: {
        type: null,
      },
      description: 'A callback function to change main nav state.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof MainNavItem>;

const Template: ComponentStory<typeof MainNavItem> = ({
  isActive = false,
  setIsActive: _setIsActive,
  ...args
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isActive);

  const toggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return <MainNavItem isActive={isOpen} setIsActive={toggle} {...args} />;
};

/**
 * MainNavItem Stories - Inactive
 */
export const Inactive = Template.bind({});
Inactive.args = {
  isActive: false,
  items: [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'contact', label: 'Contact', href: '#' },
  ],
};

/**
 * MainNavItem Stories - Active
 */
export const Active = Template.bind({});
Active.args = {
  isActive: true,
  items: [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'contact', label: 'Contact', href: '#' },
  ],
};
