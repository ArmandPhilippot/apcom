import { ComponentMeta, ComponentStory } from '@storybook/react';
import CareerIcon from './career';

export default {
  title: 'Atoms/Icons',
  component: CareerIcon,
} as ComponentMeta<typeof CareerIcon>;

const Template: ComponentStory<typeof CareerIcon> = (args) => (
  <CareerIcon {...args} />
);

export const Career = Template.bind({});
