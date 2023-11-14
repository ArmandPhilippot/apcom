import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../../atoms';
import { SharingWidget } from './sharing-widget';

/**
 * SharingWidget - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets/Sharing',
  component: SharingWidget,
  argTypes: {
    data: {
      description: 'The page data.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    media: {
      control: {
        type: null,
      },
      description: 'An array of active and ordered sharing medium.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof SharingWidget>;

const Template: ComponentStory<typeof SharingWidget> = (args) => (
  <SharingWidget {...args} />
);

/**
 * SharingWidget Stories - Sharing
 */
export const Sharing = Template.bind({});
Sharing.args = {
  data: {
    excerpt:
      'Alias similique eius ducimus laudantium aspernatur. Est rem ut eum temporibus sit reprehenderit aut non molestias. Vel dolorem expedita labore quo inventore aliquid nihil nam. Possimus nobis enim quas corporis eos.',
    title: 'Accusantium totam nostrum',
    url: 'https://www.example.test',
  },
  heading: <Heading level={3}>Share</Heading>,
  media: ['diaspora', 'facebook', 'linkedin', 'twitter', 'email'],
};
