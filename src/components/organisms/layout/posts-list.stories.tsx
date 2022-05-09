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
  },
  argTypes: {
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
    posts: {
      description: 'The posts data.',
      type: {
        name: 'object',
        required: true,
        value: {},
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
  },
} as ComponentMeta<typeof PostsList>;

const Template: ComponentStory<typeof PostsList> = (args) => (
  <PostsList {...args} />
);

const posts: Post[] = [
  {
    excerpt:
      'Esse et voluptas sapiente modi impedit unde et. Ducimus nulla ea impedit sit placeat nihil assumenda. Rem est fugiat amet quo hic. Corrupti fuga quod animi autem dolorem ullam corrupti vel aut.',
    id: 'post-1',
    meta: {
      publication: { date: '2022-02-26' },
      readingTime: '5 minutes',
      thematics: [
        <a key="cat-1" href="#">
          Cat 1
        </a>,
        <a key="cat-2" href="#">
          Cat 2
        </a>,
      ],
      commentsCount: '1 comment',
    },
    title: 'Ratione velit fuga',
    url: '#',
    cover: {
      alt: 'cover',
      height: 480,
      src: 'http://placeimg.com/640/480',
      width: 640,
      // @ts-ignore - Needed because of the placeholder image.
      unoptimized: true,
    },
  },
  {
    excerpt:
      'Illum quae asperiores quod aut necessitatibus itaque excepturi voluptas. Incidunt exercitationem ullam saepe alias consequatur sed. Quam veniam quaerat voluptatum earum quia quisquam fugiat sed perspiciatis. Et velit saepe est recusandae facilis eos eum ipsum.',
    id: 'post-2',
    meta: {
      publication: { date: '2022-02-20' },
      readingTime: '8 minutes',
      thematics: [
        <a key="cat-2" href="#">
          Cat 2
        </a>,
      ],
      commentsCount: '0 comments',
    },
    title: 'Debitis laudantium laudantium',
    url: '#',
  },
  {
    excerpt:
      'Sunt aperiam ut rem impedit dolor id sit. Reprehenderit ipsum iusto fugiat. Quaerat laboriosam magnam facilis. Totam sint aliquam voluptatem in quis laborum sunt eum. Enim aut debitis officiis porro iure quia nihil voluptas ipsum. Praesentium quis necessitatibus cumque quia qui velit quos dolorem.',
    id: 'post-3',
    meta: {
      publication: { date: '2021-12-20' },
      readingTime: '3 minutes',
      thematics: [
        <a key="cat-1" href="#">
          Cat 1
        </a>,
      ],
      commentsCount: '3 comments',
    },
    title: 'Quaerat ut corporis',
    url: '#',
    cover: {
      alt: 'cover',
      height: 480,
      src: 'http://placeimg.com/640/480',
      width: 640,
      // @ts-ignore - Needed because of the placeholder image.
      unoptimized: true,
    },
  },
];

/**
 * PostsList Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  posts,
};

/**
 * PostsList Stories - By years
 */
export const ByYears = Template.bind({});
ByYears.args = {
  posts,
  byYear: true,
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
};
