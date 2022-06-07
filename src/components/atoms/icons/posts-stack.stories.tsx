import { ComponentMeta, ComponentStory } from '@storybook/react';
import PostsStackIcon from './posts-stack';

/**
 * Posts Stack icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: PostsStackIcon,
  argTypes: {
    'aria-hidden': {
      control: {
        type: null,
      },
      description: 'Should the svg be hidden from assistive technologies?',
      table: {
        category: 'Accessibility',
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
      description: 'Set additional classnames.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof PostsStackIcon>;

const Template: ComponentStory<typeof PostsStackIcon> = (args) => (
  <PostsStackIcon {...args} />
);

/**
 * Icons Stories - Posts Stack
 */
export const PostsStack = Template.bind({});
