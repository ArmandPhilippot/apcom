import { ComponentMeta, ComponentStory } from '@storybook/react';
import Overview from './overview';

/**
 * Overview - Storybook Meta
 */
export default {
  title: 'Organisms/Layout/Overview',
  component: Overview,
  argTypes: {
    cover: {
      description: 'The overview cover.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    meta: {
      description: 'The overview metadata.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof Overview>;

const Template: ComponentStory<typeof Overview> = (args) => (
  <Overview {...args} />
);

const cover = {
  alt: 'picture',
  height: 480,
  src: 'http://placeimg.com/640/480/cats',
  width: 640,
  unoptimized: true,
};

const meta = {
  publication: { name: 'Illo ut odio:', value: 'Sequi et excepturi' },
  update: {
    name: 'Perspiciatis vel laudantium:',
    value: 'Dignissimos ratione veritatis',
  },
};

/**
 * Overview Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  cover,
  meta,
};

/**
 * Overview Stories - With cover
 */
export const WithCover = Template.bind({});
WithCover.args = {
  cover,
  meta,
};
