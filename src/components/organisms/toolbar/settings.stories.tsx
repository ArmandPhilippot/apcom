import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { Settings } from './settings';

/**
 * Settings - Storybook Meta
 */
export default {
  title: 'Organisms/Toolbar/Settings',
  component: Settings,
  args: {
    ackeeStorageKey: 'ackee-tracking',
    motionStorageKey: 'reduced-motion',
  },
  argTypes: {
    ackeeStorageKey: {
      control: {
        type: 'text',
      },
      description: 'Set Ackee settings local storage key.',
      type: {
        name: 'string',
        required: true,
      },
    },
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
      table: {
        category: 'Events',
      },
      type: {
        name: 'boolean',
        required: true,
      },
    },
    motionStorageKey: {
      control: {
        type: 'text',
      },
      description: 'Set Reduced motion settings local storage key.',
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
      type: {
        name: 'function',
        required: true,
      },
    },
    tooltipClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the tooltip wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = ({
  isActive = false,
  setIsActive: _setIsActive,
  ...args
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isActive);

  return (
    <Settings
      isActive={isOpen}
      setIsActive={() => {
        setIsOpen(!isOpen);
      }}
      {...args}
    />
  );
};

/**
 * Settings Stories - Inactive
 */
export const Inactive = Template.bind({});
Inactive.args = {
  isActive: false,
};

/**
 * Settings Stories - Active
 */
export const Active = Template.bind({});
Active.args = {
  isActive: true,
};
