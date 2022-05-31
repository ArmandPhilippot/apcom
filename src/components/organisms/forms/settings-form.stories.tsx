import { storageKey as ackeeStorageKey } from '@components/molecules/forms/ackee-select.fixture';
import { storageKey as motionStorageKey } from '@components/molecules/forms/motion-toggle.fixture';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SettingsForm from './settings-form';

/**
 * SettingsModal - Storybook Meta
 */
export default {
  title: 'Organisms/Forms',
  component: SettingsForm,
  argTypes: {
    ackeeStorageKey: {
      control: {
        type: 'text',
      },
      description: 'The local storage key for Ackee setting.',
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
    motionStorageKey: {
      control: {
        type: 'text',
      },
      description: 'The local storage key for reduced motion setting.',
      type: {
        name: 'string',
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
} as ComponentMeta<typeof SettingsForm>;

const Template: ComponentStory<typeof SettingsForm> = (args) => (
  <SettingsForm {...args} />
);

/**
 * Form Stories - Settings
 */
export const Settings = Template.bind({});
Settings.args = {
  ackeeStorageKey,
  motionStorageKey,
};
