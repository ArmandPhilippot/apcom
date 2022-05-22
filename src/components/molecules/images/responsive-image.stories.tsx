import { ComponentMeta, ComponentStory } from '@storybook/react';
import ResponsiveImage from './responsive-image';

/**
 * ResponsiveImage - Storybook Meta
 */
export default {
  title: 'Molecules/Images/ResponsiveImage',
  component: ResponsiveImage,
  args: {
    withBorders: false,
  },
  argTypes: {
    alt: {
      control: {
        type: 'text',
      },
      description: 'An alternative text.',
      type: {
        name: 'string',
        required: true,
      },
    },
    caption: {
      control: {
        type: 'text',
      },
      description: 'A figure caption.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the image wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    height: {
      control: {
        type: 'number',
      },
      description: 'The image height.',
      type: {
        name: 'string',
        required: true,
      },
    },
    src: {
      control: {
        type: 'text',
      },
      description: 'The image source.',
      type: {
        name: 'string',
        required: true,
      },
    },
    target: {
      control: {
        type: 'text',
      },
      description: 'A link target.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    width: {
      control: {
        type: 'number',
      },
      description: 'The image width.',
      type: {
        name: 'string',
        required: true,
      },
    },
    withBorders: {
      control: {
        type: 'boolean',
      },
      description: 'Add borders around the image.',
      table: {
        category: 'Styles',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof ResponsiveImage>;

const Template: ComponentStory<typeof ResponsiveImage> = (args) => (
  <ResponsiveImage {...args} />
);

/**
 * Responsive Image Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  alt: 'An example',
  src: 'http://placeimg.com/640/480/transport',
  width: 640,
  height: 480,
};

/**
 * Responsive Image Stories - With borders
 */
export const WithBorders = Template.bind({});
WithBorders.args = {
  alt: 'An example',
  src: 'http://placeimg.com/640/480/transport',
  width: 640,
  height: 480,
  withBorders: true,
};

/**
 * Responsive Image Stories - With link
 */
export const WithLink = Template.bind({});
WithLink.args = {
  alt: 'An example',
  src: 'http://placeimg.com/640/480/transport',
  width: 640,
  height: 480,
  target: '#',
};

/**
 * Responsive Image Stories - With link and borders
 */
export const WithLinkAndBorders = Template.bind({});
WithLinkAndBorders.args = {
  alt: 'An example',
  src: 'http://placeimg.com/640/480/transport',
  width: 640,
  height: 480,
  target: '#',
  withBorders: true,
};

/**
 * Responsive Image Stories - With caption
 */
export const WithCaption = Template.bind({});
WithCaption.args = {
  alt: 'An example',
  src: 'http://placeimg.com/640/480/transport',
  width: 640,
  height: 480,
  caption: 'Omnis nulla labore',
};

/**
 * Responsive Image Stories - With caption and borders
 */
export const WithCaptionAndBorders = Template.bind({});
WithCaptionAndBorders.args = {
  alt: 'An example',
  src: 'http://placeimg.com/640/480/transport',
  width: 640,
  height: 480,
  caption: 'Omnis nulla labore',
  withBorders: true,
};

/**
 * Responsive Image Stories - With caption and link
 */
export const WithCaptionAndLink = Template.bind({});
WithCaptionAndLink.args = {
  alt: 'An example',
  src: 'http://placeimg.com/640/480/transport',
  width: 640,
  height: 480,
  caption: 'Omnis nulla labore',
  target: '#',
};

/**
 * Responsive Image Stories - With caption, link and borders
 */
export const WithCaptionLinkAndBorders = Template.bind({});
WithCaptionLinkAndBorders.args = {
  alt: 'An example',
  src: 'http://placeimg.com/640/480/transport',
  width: 640,
  height: 480,
  caption: 'Omnis nulla labore',
  target: '#',
  withBorders: true,
};
