import { ComponentMeta, ComponentStory } from '@storybook/react';
import NoScript from './no-script';

/**
 * NoScript - Storybook Meta
 */
export default {
  title: 'Atoms/Layout/NoScript',
  component: NoScript,
  args: {
    position: 'initial',
  },
  argTypes: {
    message: {
      control: {
        type: 'text',
      },
      description: 'A message to display when Javascript is disabled.',
      type: {
        name: 'string',
        required: true,
      },
    },
    position: {
      control: {
        type: 'select',
      },
      description: 'The message position.',
      options: ['initial', 'top'],
      table: {
        category: 'Options',
        defaultValue: 'initial',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof NoScript>;

const Template: ComponentStory<typeof NoScript> = (args) => (
  <NoScript {...args} />
);

/**
 * NoScript Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  message: 'A noscript only message.',
  position: 'initial',
};

/**
 * NoScript Stories - Top
 */
export const Top = Template.bind({});
Top.args = {
  message: 'A noscript only message.',
  position: 'top',
};
