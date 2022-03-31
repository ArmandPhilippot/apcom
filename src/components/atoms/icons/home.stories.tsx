import { ComponentMeta, ComponentStory } from '@storybook/react';
import HomeIcon from './home';

export default {
  title: 'Atoms/Icons',
  component: HomeIcon,
} as ComponentMeta<typeof HomeIcon>;

const Template: ComponentStory<typeof HomeIcon> = (args) => (
  <HomeIcon {...args} />
);

export const Home = Template.bind({});
