import { ComponentMeta, ComponentStory } from '@storybook/react';
import FlippingLogoComponent from './flipping-logo';

/**
 * FlippingLogo - Storybook Meta
 */
export default {
  title: 'Molecules/Images',
  component: FlippingLogoComponent,
  argTypes: {
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
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the logo wrapper.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    logoTitle: {
      control: {
        type: 'text',
      },
      description: 'An accessible name for the logo.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
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
    unoptimized: { table: { disable: true } },
  },
} as ComponentMeta<typeof FlippingLogoComponent>;

const Template: ComponentStory<typeof FlippingLogoComponent> = (args) => (
  <FlippingLogoComponent {...args} />
);

/**
 * Images Stories - Flipping Logo
 */
export const FlippingLogo = Template.bind({});
FlippingLogo.args = {
  altText: 'Website picture',
  logoTitle: 'Website logo',
  photo: 'http://placeimg.com/640/480',
  // @ts-ignore - Needed because of the placeholder image.
  unoptimized: true,
};
