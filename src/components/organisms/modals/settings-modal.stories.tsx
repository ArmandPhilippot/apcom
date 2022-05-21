import { ComponentMeta, ComponentStory } from '@storybook/react';
import SettingsModal from './settings-modal';

/**
 * SettingsModal - Storybook Meta
 */
export default {
  title: 'Organisms/Modals',
  component: SettingsModal,
  argTypes: {
    ackeeStorageKey: {
      control: {
        type: 'text',
      },
      description: 'A local storage key for Ackee.',
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
      description: 'A local storage key for reduced motion setting..',
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
} as ComponentMeta<typeof SettingsModal>;

const Template: ComponentStory<typeof SettingsModal> = (args) => (
  <SettingsModal {...args} />
);

/**
 * Modals Stories - Settings
 */
export const Settings = Template.bind({});
