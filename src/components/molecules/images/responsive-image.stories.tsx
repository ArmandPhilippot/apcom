import { ComponentMeta, ComponentStory } from '@storybook/react';
import ResponsiveImageComponent from './responsive-image';

export default {
  title: 'Molecules/Images',
  component: ResponsiveImageComponent,
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
  },
} as ComponentMeta<typeof ResponsiveImageComponent>;

const Template: ComponentStory<typeof ResponsiveImageComponent> = (args) => (
  <ResponsiveImageComponent {...args} />
);

export const ResponsiveImage = Template.bind({});
ResponsiveImage.args = {
  alt: 'An example',
  src: 'http://placeimg.com/640/480/transport',
  width: 640,
  height: 480,
};
