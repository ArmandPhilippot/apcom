import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import ImageWidgetComponent from './image-widget';

export default {
  title: 'Organisms/Widgets',
  component: ImageWidgetComponent,
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
    img: {
      description: 'An image object.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    level: {
      control: {
        type: 'number',
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
} as ComponentMeta<typeof ImageWidgetComponent>;

const Template: ComponentStory<typeof ImageWidgetComponent> = (args) => (
  <IntlProvider locale="en">
    <ImageWidgetComponent {...args} />
  </IntlProvider>
);

const img = {
  alt: 'Et perferendis quaerat',
  height: 480,
  src: 'http://placeimg.com/640/480/nature',
  width: 640,
};

export const ImageWidget = Template.bind({});
ImageWidget.args = {
  expanded: true,
  img,
  level: 2,
  title: 'Quo et totam',
};
