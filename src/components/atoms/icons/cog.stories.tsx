import { ComponentMeta, ComponentStory } from '@storybook/react';
import CogIcon from './cog';

export default {
  title: 'Atoms/Icons',
  component: CogIcon,
} as ComponentMeta<typeof CogIcon>;

const Template: ComponentStory<typeof CogIcon> = (args) => (
  <CogIcon {...args} />
);

export const Cog = Template.bind({});
