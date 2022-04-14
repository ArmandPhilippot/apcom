import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import MainNavComponent from './main-nav';

export default {
  title: 'Organisms/Toolbar',
  component: MainNavComponent,
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
} as ComponentMeta<typeof MainNavComponent>;

const Template: ComponentStory<typeof MainNavComponent> = ({
  isActive,
  setIsActive: _setIsActive,
  ...args
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isActive);

  return (
    <IntlProvider locale="en">
      <MainNavComponent isActive={isOpen} setIsActive={setIsOpen} {...args} />
    </IntlProvider>
  );
};

export const MainNav = Template.bind({});
MainNav.args = {
  isActive: false,
  items: [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'contact', label: 'Contact', href: '#' },
  ],
};
