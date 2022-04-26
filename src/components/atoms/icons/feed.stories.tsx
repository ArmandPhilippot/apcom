import { ComponentMeta, ComponentStory } from '@storybook/react';
import FeedIcon from './feed';

/**
 * Feed icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: FeedIcon,
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
} as ComponentMeta<typeof FeedIcon>;

const Template: ComponentStory<typeof FeedIcon> = (args) => (
  <FeedIcon {...args} />
);

/**
 * Icons Stories - Feed
 */
export const Feed = Template.bind({});
