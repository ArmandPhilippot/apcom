import { ComponentMeta, ComponentStory } from '@storybook/react';
import PostsList, { type Post } from './posts-list';

/**
 * PostsList - Storybook Meta
 */
export default {
  title: 'Organisms/Layout/PostsList',
  component: PostsList,
  args: {
    byYear: false,
    isLoading: false,
    pageNumber: 1,
    showLoadMoreBtn: false,
    siblings: 1,
    titleLevel: 2,
  },
  argTypes: {
    baseUrl: {
      control: {
        type: 'text',
      },
      description: 'The pagination base url.',
      table: {
        category: 'Options',
        defaultValue: { summary: '/page/' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    byYear: {
      control: {
        type: 'boolean',
      },
      description: 'True to display the posts by year.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if the data is loading.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    loadMore: {
      control: {
        type: null,
      },
      description: 'A function to load more posts on button click.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
    pageNumber: {
      control: {
        type: 'number',
      },
      description: 'The current page number.',
      table: {
        category: 'Options',
        defaultValue: { summary: 1 },
      },
      type: {
        name: 'number',
        required: false,
      },
    },
    posts: {
      description: 'The posts data.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    showLoadMoreBtn: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if the load more button should be visible.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    siblings: {
      control: {
        type: 'number',
      },
      description: 'The number of page siblings inside pagination.',
      table: {
        category: 'Options',
        defaultValue: { summary: 1 },
      },
      type: {
        name: 'number',
        required: false,
      },
    },
    titleLevel: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      description: 'The title level (hn).',
      table: {
        category: 'Options',
        defaultValue: { summary: 2 },
      },
      type: {
        name: 'number',
        required: false,
      },
    },
    total: {
      control: {
        type: 'number',
      },
      description: 'The number of posts.',
      type: {
        name: 'number',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof PostsList>;

const Template: ComponentStory<typeof PostsList> = (args) => (
  <PostsList {...args} />
);

const excerpt1 =
  'Esse et voluptas sapiente modi impedit unde et. Ducimus nulla ea impedit sit placeat nihil assumenda. Rem est fugiat amet quo hic. Corrupti fuga quod animi autem dolorem ullam corrupti vel aut.';
const excerpt2 =
  'Illum quae asperiores quod aut necessitatibus itaque excepturi voluptas. Incidunt exercitationem ullam saepe alias consequatur sed. Quam veniam quaerat voluptatum earum quia quisquam fugiat sed perspiciatis. Et velit saepe est recusandae facilis eos eum ipsum.';
const excerpt3 =
  'Sunt aperiam ut rem impedit dolor id sit. Reprehenderit ipsum iusto fugiat. Quaerat laboriosam magnam facilis. Totam sint aliquam voluptatem in quis laborum sunt eum. Enim aut debitis officiis porro iure quia nihil voluptas ipsum. Praesentium quis necessitatibus cumque quia qui velit quos dolorem.';

const posts: Post[] = [
  {
    excerpt: excerpt1,
    id: 'post-1',
    meta: {
      dates: { publication: '2022-02-26' },
      readingTime: { wordsCount: excerpt1.split(' ').length },
      thematics: [
        { id: 'cat-1', name: 'Cat 1', url: '#' },
        { id: 'cat-2', name: 'Cat 2', url: '#' },
      ],
      commentsCount: 1,
    },
    title: 'Ratione velit fuga',
    url: '#',
    cover: {
      alt: 'cover',
      height: 480,
      src: 'http://placeimg.com/640/480',
      width: 640,
    },
  },
  {
    excerpt: excerpt2,
    id: 'post-2',
    meta: {
      dates: { publication: '2022-02-20' },
      readingTime: { wordsCount: excerpt2.split(' ').length },
      thematics: [{ id: 'cat-2', name: 'Cat 2', url: '#' }],
      commentsCount: 0,
    },
    title: 'Debitis laudantium laudantium',
    url: '#',
  },
  {
    excerpt: excerpt3,
    id: 'post-3',
    meta: {
      dates: { publication: '2021-12-20' },
      readingTime: { wordsCount: excerpt3.split(' ').length },
      thematics: [{ id: 'cat-1', name: 'Cat 1', url: '#' }],
      commentsCount: 3,
    },
    title: 'Quaerat ut corporis',
    url: '#',
    cover: {
      alt: 'cover',
      height: 480,
      src: 'http://placeimg.com/640/480',
      width: 640,
    },
  },
];

/**
 * PostsList Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  posts,
  total: posts.length,
};

/**
 * PostsList Stories - By years
 */
export const ByYears = Template.bind({});
ByYears.args = {
  posts,
  byYear: true,
  total: posts.length,
};
ByYears.decorators = [
  (Story) => (
    <div style={{ marginLeft: 150 }}>
      <Story />
    </div>
  ),
];

/**
 * PostsList Stories - No results
 */
export const NoResults = Template.bind({});
NoResults.args = {
  posts: [],
  total: posts.length,
};
