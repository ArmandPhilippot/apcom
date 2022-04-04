import { ComponentMeta, ComponentStory } from '@storybook/react';
import FlippingLogoComponent from './flipping-logo';

export default {
  title: 'Molecules/Layout',
  component: FlippingLogoComponent,
  argTypes: {
    additionalClasses: {
      control: {
        type: 'text',
      },
      description: 'Adds additional classes to the logo wrapper.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    altText: {
      control: {
        type: 'text',
      },
      description: 'Photo alternative text.',
      type: {
        name: 'string',
        required: true,
      },
    },
    photo: {
      control: {
        type: 'text',
      },
      description: 'Photo url.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof FlippingLogoComponent>;

const Template: ComponentStory<typeof FlippingLogoComponent> = (args) => (
  <FlippingLogoComponent {...args} />
);

export const FlippingLogo = Template.bind({});
FlippingLogo.args = {
  altText: 'Website picture',
  logoTitle: 'Website logo',
  photo: 'http://placeimg.com/640/480',
};
