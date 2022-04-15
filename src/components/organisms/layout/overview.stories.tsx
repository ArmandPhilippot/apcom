import { ComponentMeta, ComponentStory } from '@storybook/react';
import OverviewComponent from './overview';

export default {
  title: 'Organisms/Layout',
  component: OverviewComponent,
  argTypes: {
    cover: {
      description: 'The overview cover.',
      type: {
        name: 'object',
        required: true,
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
} as ComponentMeta<typeof OverviewComponent>;

const Template: ComponentStory<typeof OverviewComponent> = (args) => (
  <OverviewComponent {...args} />
);

const cover = {
  alt: 'picture',
  height: 480,
  src: 'http://placeimg.com/640/480/cats',
  width: 640,
};

const meta = {
  publication: { name: 'Illo ut odio:', value: 'Sequi et excepturi' },
  update: {
    name: 'Perspiciatis vel laudantium:',
    value: 'Dignissimos ratione veritatis',
  },
};

export const Overview = Template.bind({});
Overview.args = {
  cover,
  meta,
};
