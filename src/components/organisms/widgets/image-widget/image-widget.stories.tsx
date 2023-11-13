import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NextImage from 'next/image';
import { Heading } from '../../../atoms';
import { ImageWidget } from './image-widget';

/**
 * ImageWidget - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets/Image',
  component: ImageWidget,
  argTypes: {
    description: {
      control: {
        type: 'text',
      },
      description: 'Add a caption image.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    img: {
      description: 'The image.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    url: {
      control: {
        type: 'text',
      },
      description: 'Add a link to the image.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof ImageWidget>;

const Template: ComponentStory<typeof ImageWidget> = (args) => (
  <ImageWidget {...args} />
);

const image = {
  alt: '',
  height: 480,
  src: 'https://picsum.photos/640/480',
  width: 640,
};

/**
 * ImageWidget Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  heading: (
    <Heading isFake level={3}>
      Quo et totam
    </Heading>
  ),
  img: <NextImage {...image} />,
};

/**
 * ImageWidget Stories - WithDescription
 */
export const WithDescription = Template.bind({});
WithDescription.args = {
  description: 'Any image used as an example',
  heading: (
    <Heading isFake level={3}>
      Quo et totam
    </Heading>
  ),
  img: <NextImage {...image} />,
};

/**
 * ImageWidget Stories - WithLink
 */
export const WithLink = Template.bind({});
WithLink.args = {
  heading: (
    <Heading isFake level={3}>
      Quo et totam
    </Heading>
  ),
  img: <NextImage {...image} />,
  url: 'https://www.armandphilippot.com/',
};

/**
 * ImageWidget Stories - WithDescriptionAndLink
 */
export const WithDescriptionAndLink = Template.bind({});
WithDescriptionAndLink.args = {
  description: 'Any image used as an example',
  heading: (
    <Heading isFake level={3}>
      Quo et totam
    </Heading>
  ),
  img: <NextImage {...image} />,
  url: 'https://www.armandphilippot.com/',
};
