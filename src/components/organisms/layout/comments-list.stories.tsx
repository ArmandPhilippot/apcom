import { ComponentMeta, ComponentStory } from '@storybook/react';
import CommentsListComponent, { type Comment } from './comments-list';

const saveComment = async () => {
  /** Do nothing. */
};

/**
 * CommentsList - Storybook Meta
 */
export default {
  title: 'Organisms/Layout/CommentsList',
  component: CommentsListComponent,
  args: {
    saveComment,
  },
  argTypes: {
    comments: {
      control: {
        type: null,
      },
      description: 'An array of comments.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    depth: {
      control: {
        type: 'number',
        min: 0,
        max: 4,
      },
      description: 'The maximum depth. Use `0` to not display nested comments.',
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
} as ComponentMeta<typeof CommentsListComponent>;

const Template: ComponentStory<typeof CommentsListComponent> = (args) => (
  <CommentsListComponent {...args} />
);

const comments: Comment[] = [
  {
    author: {
      avatar: 'http://placeimg.com/640/480',
      name: 'Author 1',
    },
    content:
      'Voluptas ducimus inventore. Libero ut et doloribus. Earum nostrum ab. Aliquam rem dolores omnis voluptate. Sunt aut ut et.',
    id: 1,
    publication: '2021-04-03 18:04:11',
  },
  {
    child: [
      {
        author: {
          avatar: 'http://placeimg.com/640/480',
          name: 'Author 4',
        },
        content:
          'Vel ullam in porro tempore. Maiores quos quia magnam beatae nemo libero velit numquam. Sapiente aliquid cumque. Velit neque in adipisci aut assumenda voluptates earum. Autem esse autem provident in tempore. Aut distinctio dolor qui repellat et et adipisci velit aspernatur.',
        id: 4,
        publication: '2021-04-03 23:04:24',
      },
      {
        author: {
          avatar: 'http://placeimg.com/640/480',
          name: 'Author 1',
        },
        content:
          'Sed non omnis. Quam porro est. Quae tempore quae. Exercitationem eos non velit voluptatem velit voluptas iusto. Sit debitis qui ipsam quo asperiores numquam veniam praesentium ut.',
        id: 5,
        publication: '2021-04-04 08:05:14',
      },
    ],
    author: {
      avatar: 'http://placeimg.com/640/480',
      name: 'Author 2',
      url: '#',
    },
    content:
      'Sit sed error quasi voluptatem velit voluptas aut. Aut debitis eveniet. Praesentium dolores quia voluptate vero quis dicta quasi vel. Aut voluptas accusantium ut aut quidem consectetur itaque laboriosam occaecati.',
    id: 2,
    publication: '2021-04-03 23:30:20',
  },
  {
    author: {
      avatar: 'http://placeimg.com/640/480',
      name: 'Author 3',
    },
    content:
      'Natus consequatur maiores aperiam dolore eius nesciunt ut qui et. Ab ea nobis est. Eaque dolor corrupti id aut. Impedit architecto autem qui neque rerum ab dicta dignissimos voluptates.',
    id: 3,
    publication: '2021-09-13 13:24:54',
  },
];

/**
 * Layout Stories - Without child comments
 */
export const WithoutChildComments = Template.bind({});
WithoutChildComments.args = {
  comments,
  depth: 0,
};

/**
 * Layout Stories - With child comments
 */
export const WithChildComments = Template.bind({});
WithChildComments.args = {
  comments,
  depth: 1,
};
