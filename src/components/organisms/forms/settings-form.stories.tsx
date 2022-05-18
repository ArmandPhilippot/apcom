import { ComponentMeta, ComponentStory } from '@storybook/react';
import SettingsForm from './settings-form';

/**
 * SettingsModal - Storybook Meta
 */
export default {
  title: 'Organisms/Forms',
  component: SettingsForm,
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
} as ComponentMeta<typeof SettingsForm>;

const Template: ComponentStory<typeof SettingsForm> = (args) => (
  <SettingsForm {...args} />
);

/**
 * Form Stories - Settings
 */
export const Settings = Template.bind({});
