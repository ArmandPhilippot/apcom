import type { Meta, StoryObj } from '@storybook/react';
import NextImage from 'next/image';
import { Heading } from '../../../atoms';
import { ImageWidget } from './image-widget';

const meta = {
  component: ImageWidget,
  title: 'Organisms/Widgets/Image',
} satisfies Meta<typeof ImageWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

const image = {
  alt: '',
  height: 480,
  src: 'https://picsum.photos/640/480',
  width: 640,
};

export const Example: Story = {
  args: {
    heading: (
      <Heading isFake level={3}>
        Quo et totam
      </Heading>
    ),
    img: <NextImage {...image} />,
  },
};

export const WithDescription: Story = {
  args: {
    description: 'Any image used as an example',
    heading: (
      <Heading isFake level={3}>
        Quo et totam
      </Heading>
    ),
    img: <NextImage {...image} />,
  },
};

export const WithLink: Story = {
  args: {
    heading: (
      <Heading isFake level={3}>
        Quo et totam
      </Heading>
    ),
    img: <NextImage {...image} />,
    url: 'https://www.armandphilippot.com/',
  },
};

export const WithDescriptionAndLink: Story = {
  args: {
    description: 'Any image used as an example',
    heading: (
      <Heading isFake level={3}>
        Quo et totam
      </Heading>
    ),
    img: <NextImage {...image} />,
    url: 'https://www.armandphilippot.com/',
  },
};
