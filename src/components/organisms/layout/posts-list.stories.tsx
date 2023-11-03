import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { PostsList } from './posts-list';
import { posts } from './posts-list.fixture';

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
