import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { PostsList } from './posts-list';

/**
 * PostsList - Storybook Meta
 */
export default {
  title: 'Organisms/PostsList',
  component: PostsList,
  args: {},
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
  posts: [
    {
      excerpt:
        'Omnis voluptatem et sit sit porro possimus quo rerum. Natus et sint cupiditate magnam omnis a consequuntur reprehenderit. Ex omnis voluptatem itaque id laboriosam qui dolorum facilis architecto. Impedit aliquid et qui quae dolorum accusamus rerum.',
      heading: 'Post 1',
      id: 'post1',
      meta: { publicationDate: '2023-11-06' },
      url: '#post1',
    },
    {
      excerpt:
        'Nobis omnis excepturi deserunt laudantium unde totam quam. Voluptates maiores minima voluptatem nihil ea voluptatem similique. Praesentium ratione necessitatibus et et dolore voluptas illum dignissimos ipsum. Eius tempore ex.',
      heading: 'Post 2',
      id: 'post2',
      meta: { publicationDate: '2023-11-05' },
      url: '#post2',
    },
    {
      excerpt:
        'Doloremque est dolorum explicabo. Laudantium quos delectus odit esse fugit officiis. Fugit provident vero harum atque. Eos nam qui sit ut minus voluptas. Reprehenderit rerum ut nostrum. Eos dolores mollitia quia ea voluptatem rerum vel.',
      heading: 'Post 3',
      id: 'post3',
      meta: { publicationDate: '2023-11-04' },
      url: '#post3',
    },
  ],
};
