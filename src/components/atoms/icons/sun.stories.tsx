import { ComponentMeta, ComponentStory } from '@storybook/react';
import SunIcon from './sun';

export default {
  title: 'Atoms/Icons',
  component: SunIcon,
} as ComponentMeta<typeof SunIcon>;

const Template: ComponentStory<typeof SunIcon> = (args) => (
  <SunIcon {...args} />
);

export const Sun = Template.bind({});
