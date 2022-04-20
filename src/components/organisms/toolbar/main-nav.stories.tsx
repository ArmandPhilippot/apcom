import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import MainNav from './main-nav';

/**
 * MainNav - Storybook Meta
 */
export default {
  title: 'Organisms/Toolbar/MainNav',
  component: MainNav,
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
      type: {
        name: 'function',
        required: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
} as ComponentMeta<typeof MainNav>;

const Template: ComponentStory<typeof MainNav> = ({
  isActive,
  setIsActive: _setIsActive,
  ...args
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isActive);

  return <MainNav isActive={isOpen} setIsActive={setIsOpen} {...args} />;
};

/**
 * MainNav Stories - Inactive
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
 * MainNav Stories - Active
 */
export const Active = Template.bind({});
Active.args = {
  isActive: true,
  items: [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'contact', label: 'Contact', href: '#' },
  ],
};
