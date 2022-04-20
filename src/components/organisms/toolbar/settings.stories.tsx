import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Settings from './settings';

/**
 * Settings - Storybook Meta
 */
export default {
  title: 'Organisms/Toolbar/Settings',
  component: Settings,
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
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = ({
  isActive,
  setIsActive: _setIsActive,
  ...args
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isActive);

  return <Settings isActive={isOpen} setIsActive={setIsOpen} {...args} />;
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
