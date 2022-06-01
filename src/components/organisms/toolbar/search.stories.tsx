import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Search from './search';

/**
 * Search - Storybook Meta
 */
export default {
  title: 'Organisms/Toolbar/Search',
  component: Search,
  args: {
    searchPage: '#',
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the modal wrapper.',
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
      description: 'Define the modal state: either opened or closed.',
      type: {
        name: 'boolean',
        required: true,
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
    setIsActive: {
      control: {
        type: null,
      },
      description: 'A callback function to update modal state.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = ({
  isActive,
  setIsActive: _setIsActive,
  ...args
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isActive);

  return (
    <Search
      isActive={isOpen}
      setIsActive={() => {
        setIsOpen(!isOpen);
      }}
      {...args}
    />
  );
};

/**
 * Search Stories - Inactive
 */
export const Inactive = Template.bind({});
Inactive.args = {
  isActive: false,
};

/**
 * Search Stories - Active
 */
export const Active = Template.bind({});
Active.args = {
  isActive: true,
};
