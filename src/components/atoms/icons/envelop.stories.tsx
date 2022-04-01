import { ComponentMeta, ComponentStory } from '@storybook/react';
import EnvelopIcon from './envelop';

export default {
  title: 'Atoms/Icons',
  component: EnvelopIcon,
} as ComponentMeta<typeof EnvelopIcon>;

const Template: ComponentStory<typeof EnvelopIcon> = (args) => (
  <EnvelopIcon {...args} />
);

export const Envelop = Template.bind({});
