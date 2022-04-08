import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SettingsModal from './settings-modal';

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
  },
} as ComponentMeta<typeof SettingsModal>;

const Template: ComponentStory<typeof SettingsModal> = (args) => (
  <IntlProvider locale="en">
    <SettingsModal {...args} />
  </IntlProvider>
);

export const Settings = Template.bind({});
