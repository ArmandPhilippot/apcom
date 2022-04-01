import { ComponentMeta, ComponentStory } from '@storybook/react';
import CloseIcon from './close';

export default {
  title: 'Atoms/Icons',
  component: CloseIcon,
} as ComponentMeta<typeof CloseIcon>;

const Template: ComponentStory<typeof CloseIcon> = (args) => (
  <CloseIcon {...args} />
);

export const Close = Template.bind({});
