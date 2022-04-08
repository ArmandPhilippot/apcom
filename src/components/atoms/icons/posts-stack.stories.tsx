import { ComponentMeta, ComponentStory } from '@storybook/react';
import PostsStackIcon from './posts-stack';

export default {
  title: 'Atoms/Icons',
  component: PostsStackIcon,
  argTypes: {
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

export const PostsStack = Template.bind({});
