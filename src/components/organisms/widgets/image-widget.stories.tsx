import { ComponentMeta, ComponentStory } from '@storybook/react';
import ImageWidget from './image-widget';

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
    expanded: {
      control: {
        type: 'boolean',
      },
      description: 'The state of the widget.',
      type: {
        name: 'boolean',
        required: true,
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
    level: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      description: 'The widget title level (hn).',
      type: {
        name: 'number',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The widget title.',
      type: {
        name: 'string',
        required: true,
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
  src: 'http://placeimg.com/640/480/nature',
  width: 640,
};

/**
 * ImageWidget Stories - Align left
 */
export const AlignLeft = Template.bind({});
AlignLeft.args = {
  alignment: 'left',
  expanded: true,
  image,
  level: 2,
  title: 'Quo et totam',
};

/**
 * ImageWidget Stories - Align center
 */
export const AlignCenter = Template.bind({});
AlignCenter.args = {
  alignment: 'center',
  expanded: true,
  image,
  level: 2,
  title: 'Quo et totam',
};

/**
 * ImageWidget Stories - Align right
 */
export const AlignRight = Template.bind({});
AlignRight.args = {
  alignment: 'right',
  expanded: true,
  image,
  level: 2,
  title: 'Quo et totam',
};

/**
 * ImageWidget Stories - With description
 */
export const WithDescription = Template.bind({});
WithDescription.args = {
  description: 'Sint enim harum',
  expanded: true,
  image,
  level: 2,
  title: 'Quo et totam',
};
