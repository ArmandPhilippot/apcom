import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { SettingsForm } from './settings-form';

/**
 * SettingsForm - Storybook Meta
 */
export default {
  title: 'Organisms/Forms/Settings',
  component: SettingsForm,
  argTypes: {},
} as ComponentMeta<typeof SettingsForm>;

const Template: ComponentStory<typeof SettingsForm> = (args) => (
  <SettingsForm {...args} />
);

/**
 * Forms Stories - Settings
 */
export const Settings = Template.bind({});
Settings.args = {};
