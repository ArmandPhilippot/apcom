import { ComponentMeta, ComponentStory } from '@storybook/react';
import CommentComponent from './comment';

const saveComment = async () => {
  /** Do nothing. */
};

/**
 * Comment - Storybook Meta
 */
export default {
  title: 'Organisms/Layout',
  component: CommentComponent,
  args: {
    canReply: true,
    saveComment,
  },
  argTypes: {
    author: {
      description: 'The author data.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    canReply: {
      control: {
        type: 'boolean',
      },
      description: 'Enable or disable the reply button.',
      table: {
        category: 'Options',
        defaultValue: { summary: true },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    content: {
      control: {
        type: 'text',
      },
      description: 'The comment body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    id: {
      control: {
        type: 'number',
      },
      description: 'The comment id.',
      type: {
        name: 'number',
        required: true,
      },
    },
    Notice: {
      control: {
        type: null,
      },
      description: 'A component to display a success or error message.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
    parentId: {
      control: {
        type: null,
      },
      description: 'The parent id if it is a reply.',
      type: {
        name: 'number',
        required: false,
      },
    },
    publication: {
      description: 'The publication date.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    saveComment: {
      control: {
        type: null,
      },
      description: 'A callback function to save the comment form data.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof CommentComponent>;

const Template: ComponentStory<typeof CommentComponent> = (args) => (
  <CommentComponent {...args} />
);

/**
 * Layout Stories - Comment
 */
export const Comment = Template.bind({});
Comment.args = {
  author: {
    avatar: 'http://placeimg.com/640/480',
    name: 'Armand',
    url: 'https://www.armandphilippot.com/',
  },
  content:
    'Harum aut cumque iure fugit neque sequi cupiditate repudiandae laudantium. Ratione aut assumenda qui illum voluptas accusamus quis officiis exercitationem. Consectetur est harum eius perspiciatis officiis nihil. Aut corporis minima debitis adipisci possimus debitis et.',
  id: 2,
  publication: '2021-04-03 23:04:24',
  // @ts-ignore - Needed because of the placeholder image.
  unoptimized: true,
};
