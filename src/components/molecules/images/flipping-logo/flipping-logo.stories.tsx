import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NextImage from 'next/image';
import { Logo } from '../../../atoms';
import { FlippingLogo as FlippingLogoComponent } from './flipping-logo';

/**
 * FlippingLogo - Storybook Meta
 */
export default {
  title: 'Molecules/Images/Flipping Logo',
  component: FlippingLogoComponent,
  args: {},
  argTypes: {},
} as ComponentMeta<typeof FlippingLogoComponent>;

const Template: ComponentStory<typeof FlippingLogoComponent> = (args) => (
  <FlippingLogoComponent {...args} />
);

/**
 * FlippingLogo Story
 */
export const FlippingLogo = Template.bind({});
FlippingLogo.args = {
  back: <Logo heading="A logo example" />,
  front: (
    <NextImage
      alt="A photo example"
      height={200}
      src="https://picsum.photos/200"
      width={200}
    />
  ),
};
