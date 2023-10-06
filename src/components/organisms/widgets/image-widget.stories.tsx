import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../atoms';
import { ImageWidget } from './image-widget';

/**
 * ImageWidget - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets/Image',
  component: ImageWidget,
  args: {
    alignment: 'left',
  },
  argTypes: {
    alignment: {
      control: {
        type: 'select',
      },
      description: 'The content alignment.',
      options: ['left', 'center', 'right'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'left' },
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
      description: 'Set additional classnames to the widget wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
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
    image: {
      description: 'An image object.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    imageClassName: {
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
  alt: 'Et perferendis quaerat',
  height: 480,
  src: 'http://picsum.photos/640/480',
  width: 640,
};

/**
 * ImageWidget Stories - Align left
 */
export const AlignLeft = Template.bind({});
AlignLeft.args = {
  alignment: 'left',
  heading: (
    <Heading isFake level={3}>
      Quo et totam
    </Heading>
  ),
  image,
};

/**
 * ImageWidget Stories - Align center
 */
export const AlignCenter = Template.bind({});
AlignCenter.args = {
  alignment: 'center',
  heading: (
    <Heading isFake level={3}>
      Quo et totam
    </Heading>
  ),
  image,
};

/**
 * ImageWidget Stories - Align right
 */
export const AlignRight = Template.bind({});
AlignRight.args = {
  alignment: 'right',
  heading: (
    <Heading isFake level={3}>
      Quo et totam
    </Heading>
  ),
  image,
};

/**
 * ImageWidget Stories - With description
 */
export const WithDescription = Template.bind({});
WithDescription.args = {
  description: 'Sint enim harum',
  heading: (
    <Heading isFake level={3}>
      Quo et totam
    </Heading>
  ),
  image,
};
