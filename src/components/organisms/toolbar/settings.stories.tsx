import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import SettingsComponent from './settings';

export default {
  title: 'Organisms/Toolbar',
  component: SettingsComponent,
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
} as ComponentMeta<typeof SettingsComponent>;

const Template: ComponentStory<typeof SettingsComponent> = ({
  isActive,
  setIsActive: _setIsActive,
  ...args
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isActive);

  return (
    <IntlProvider locale="en">
      <SettingsComponent isActive={isOpen} setIsActive={setIsOpen} {...args} />
    </IntlProvider>
  );
};

export const Settings = Template.bind({});
Settings.args = {
  isActive: false,
};
