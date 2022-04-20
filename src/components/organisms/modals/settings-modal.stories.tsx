import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SettingsModal from './settings-modal';

/**
 * SettingsModal - Storybook Meta
 */
export default {
  title: 'Organisms/Modals',
  component: SettingsModal,
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
} as ComponentMeta<typeof SettingsModal>;

const Template: ComponentStory<typeof SettingsModal> = (args) => (
  <SettingsModal {...args} />
);

/**
 * Modals Stories - Settings
 */
export const Settings = Template.bind({});
