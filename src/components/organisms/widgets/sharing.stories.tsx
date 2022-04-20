import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SharingWidget from './sharing';

/**
 * Sharing - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets',
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
    expanded: {
      control: {
        type: null,
      },
      description: 'Default widget state (expanded or collapsed).',
      type: {
        name: 'boolean',
        required: true,
      },
    },
    level: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      description: 'The heading level.',
      type: {
        name: 'number',
        required: true,
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
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
} as ComponentMeta<typeof SharingWidget>;

const Template: ComponentStory<typeof SharingWidget> = (args) => (
  <SharingWidget {...args} />
);

/**
 * Widgets Stories - Sharing
 */
export const Sharing = Template.bind({});
Sharing.args = {
  expanded: true,
  data: {
    excerpt:
      'Alias similique eius ducimus laudantium aspernatur. Est rem ut eum temporibus sit reprehenderit aut non molestias. Vel dolorem expedita labore quo inventore aliquid nihil nam. Possimus nobis enim quas corporis eos.',
    title: 'Accusantium totam nostrum',
    url: 'https://www.example.test',
  },
  level: 2,
  media: ['diaspora', 'facebook', 'linkedin', 'twitter', 'email'],
  title: 'Sharing',
};
