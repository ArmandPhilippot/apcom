import { ComponentMeta, ComponentStory } from '@storybook/react';
import LogoComponent from './logo';

export default {
  title: 'Atoms/Images',
  component: LogoComponent,
} as ComponentMeta<typeof LogoComponent>;

const Template: ComponentStory<typeof LogoComponent> = (args) => (
  <LogoComponent {...args} />
);

export const Logo = Template.bind({});
