import { ComponentMeta, ComponentStory } from '@storybook/react';
import MoonIcon from './moon';

export default {
  title: 'Atoms/Icons',
  component: MoonIcon,
} as ComponentMeta<typeof MoonIcon>;

const Template: ComponentStory<typeof MoonIcon> = (args) => (
  <MoonIcon {...args} />
);

export const Moon = Template.bind({});
