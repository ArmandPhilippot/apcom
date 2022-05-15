import ButtonLink from '@components/atoms/buttons/button-link';
import Heading from '@components/atoms/headings/heading';
import Link from '@components/atoms/links/link';
import ProgressBar from '@components/atoms/loaders/progress-bar';
import PostsList from '@components/organisms/layout/posts-list';
import LinksListWidget from '@components/organisms/widgets/links-list-widget';
import Sharing from '@components/organisms/widgets/sharing';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import PageLayoutComponent from './page-layout';

/**
 * PageLayout - Storybook Meta
 */
export default {
  title: 'Templates/Page',
  component: PageLayoutComponent,
  args: {
    allowComments: false,
  },
  argTypes: {
    allowComments: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if the comment form is displayed.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    breadcrumb: {
      description: 'The breadcrumb items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    children: {
      control: {
        type: 'text',
      },
      description: 'The page content.',
      type: {
        name: 'string',
        required: true,
      },
    },
    comments: {
      description: 'The page comments.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    footerMeta: {
      description: 'The metadata to display in the page footer.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    headerMeta: {
      description: 'The metadata to display in the page header.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    id: {
      control: {
        type: 'number',
      },
      description: 'The page id.',
      type: {
        name: 'number',
        required: false,
      },
    },
    intro: {
      control: {
        type: 'text',
      },
      description: 'The page introduction.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    isHome: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if the current page is the homepage.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The page title.',
      type: {
        name: 'string',
        required: true,
      },
    },
    widgets: {
      control: {
        type: null,
      },
      description: 'An array of widgets to put inside the last sidebar.',
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    withToC: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if the Table of Contents should be in the page.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PageLayoutComponent>;

const Template: ComponentStory<typeof PageLayoutComponent> = (args) => (
  <PageLayoutComponent {...args} />
);

const pageTitle = 'Incidunt ad earum';
const pageIntro =
  'Recusandae mollitia enim quo omnis rerum enim corporis ratione quidem. Pariatur omnis quas est ut ut numquam totam. Sunt sapiente nostrum aut sunt provident perspiciatis magni illum. Quidem nihil velit quasi fugit minima sint.';
const pageBreadcrumb = [
  { id: 'home', url: '#', name: 'Home' },
  { id: 'page', url: '#', name: pageTitle },
];

/**
 * Page Layout Stories - Single Page
 */
export const SinglePage = Template.bind({});
SinglePage.args = {
  breadcrumb: pageBreadcrumb,
  title: pageTitle,
  intro: pageIntro,
  children: (
    <>
      <Heading level={2}>Impedit commodi rerum</Heading>
      <p>
        Omnis vel earum cupiditate delectus reprehenderit perferendis distinctio
        omnis. Laudantium rem tempore eligendi porro officia est dolorum
        assumenda. Corrupti tempore quia ab. Quidem est inventore. Autem
        nesciunt sed rerum praesentium.
      </p>
      <p>
        Illo nostrum inventore tenetur quo repellendus autem nisi nostrum
        dolore. Et velit assumenda. Veniam harum officia et. Blanditiis et et
        qui cum. Rerum illum quo doloribus neque non velit. Unde iusto et eaque
        a ut.
      </p>
      <Heading level={2}>Et omnis ducimus</Heading>
      <p>
        Dolor quidem quas perferendis in nam molestiae. Accusamus quidem
        accusantium quaerat est praesentium accusamus ab dolorem. Beatae illum
        totam et corrupti assumenda corporis aut illo animi.
      </p>
      <p>
        Ad rem soluta. Est tenetur consequatur sequi voluptates autem. Molestiae
        in neque dignissimos. Dolorum numquam quos quam voluptas atque facilis
        et. Accusantium fuga architecto excepturi consequatur libero est.
      </p>
    </>
  ),
  widgets: [
    <Sharing
      key="sidebar2-widget1"
      data={{ excerpt: pageIntro, title: pageTitle, url: '#' }}
      media={[
        'diaspora',
        'email',
        'facebook',
        'journal-du-hacker',
        'linkedin',
        'twitter',
      ]}
      level={2}
      expanded={true}
    />,
  ],
  withToC: true,
};

const postBreadcrumb = [
  { id: 'home', url: '#', name: 'Home' },
  { id: 'blog', url: '#', name: 'Blog' },
  { id: 'post', url: '#', name: pageTitle },
];

const comments = [
  {
    author: {
      avatar: 'http://placeimg.com/640/480',
      name: 'Author 1',
    },
    content:
      'Voluptas ducimus inventore. Libero ut et doloribus. Earum nostrum ab. Aliquam rem dolores omnis voluptate. Sunt aut ut et.',
    id: 1,
    publication: '2021-04-03 18:04:11',
    // @ts-ignore - Needed because of the placeholder image.
    unoptimized: true,
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
        // @ts-ignore - Needed because of the placeholder image.
        unoptimized: true,
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
        // @ts-ignore - Needed because of the placeholder image.
        unoptimized: true,
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
    // @ts-ignore - Needed because of the placeholder image.
    unoptimized: true,
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
    // @ts-ignore - Needed because of the placeholder image.
    unoptimized: true,
  },
];

/**
 * Page Layout Stories - Post
 */
export const Post = Template.bind({});
Post.args = {
  breadcrumb: postBreadcrumb,
  title: pageTitle,
  intro: pageIntro,
  headerMeta: {
    publication: { date: '2020-03-14' },
    thematics: [
      <Link key="cat1" href="#">
        Cat 1
      </Link>,
      <Link key="cat2" href="#">
        Cat 2
      </Link>,
    ],
  },
  footerMeta: {
    custom: {
      label: 'Read more about:',
      value: <ButtonLink target="#">Topic 1</ButtonLink>,
    },
  },
  children: (
    <>
      <Heading level={2}>Impedit commodi rerum</Heading>
      <p>
        Omnis vel earum cupiditate delectus reprehenderit perferendis distinctio
        omnis. Laudantium rem tempore eligendi porro officia est dolorum
        assumenda. Corrupti tempore quia ab. Quidem est inventore. Autem
        nesciunt sed rerum praesentium.
      </p>
      <p>
        Illo nostrum inventore tenetur quo repellendus autem nisi nostrum
        dolore. Et velit assumenda. Veniam harum officia et. Blanditiis et et
        qui cum. Rerum illum quo doloribus neque non velit. Unde iusto et eaque
        a ut.
      </p>
      <Heading level={2}>Et omnis ducimus</Heading>
      <p>
        Dolor quidem quas perferendis in nam molestiae. Accusamus quidem
        accusantium quaerat est praesentium accusamus ab dolorem. Beatae illum
        totam et corrupti assumenda corporis aut illo animi.
      </p>
      <p>
        Ad rem soluta. Est tenetur consequatur sequi voluptates autem. Molestiae
        in neque dignissimos. Dolorum numquam quos quam voluptas atque facilis
        et. Accusantium fuga architecto excepturi consequatur libero est.
      </p>
    </>
  ),
  widgets: [
    <Sharing
      key="sidebar2-widget1"
      data={{ excerpt: pageIntro, title: pageTitle, url: '#' }}
      media={[
        'diaspora',
        'email',
        'facebook',
        'journal-du-hacker',
        'linkedin',
        'twitter',
      ]}
      level={2}
      expanded={true}
    />,
  ],
  withToC: true,
  comments,
  allowComments: true,
};

const postsListBreadcrumb = [
  { id: 'home', url: '#', name: 'Home' },
  { id: 'blog', url: '#', name: 'Blog' },
];

const excerpt1 =
  'Esse et voluptas sapiente modi impedit unde et. Ducimus nulla ea impedit sit placeat nihil assumenda. Rem est fugiat amet quo hic. Corrupti fuga quod animi autem dolorem ullam corrupti vel aut.';
const excerpt2 =
  'Illum quae asperiores quod aut necessitatibus itaque excepturi voluptas. Incidunt exercitationem ullam saepe alias consequatur sed. Quam veniam quaerat voluptatum earum quia quisquam fugiat sed perspiciatis. Et velit saepe est recusandae facilis eos eum ipsum.';
const excerpt3 =
  'Sunt aperiam ut rem impedit dolor id sit. Reprehenderit ipsum iusto fugiat. Quaerat laboriosam magnam facilis. Totam sint aliquam voluptatem in quis laborum sunt eum. Enim aut debitis officiis porro iure quia nihil voluptas ipsum. Praesentium quis necessitatibus cumque quia qui velit quos dolorem.';

const posts = [
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
      // @ts-ignore - Needed because of the placeholder image.
      unoptimized: true,
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
      // @ts-ignore - Needed because of the placeholder image.
      unoptimized: true,
    },
  },
];

const blogCategories = [
  { name: 'Cat 1', url: '#' },
  {
    name: 'Cat 2',
    url: '#',
  },
  { name: 'Cat 3', url: '#' },
  { name: 'Cat 4', url: '#' },
];

/**
 * Page Layout Stories - Posts list
 */
export const Blog = Template.bind({});
Blog.args = {
  breadcrumb: postsListBreadcrumb,
  title: 'Blog',
  headerMeta: { total: `${posts.length} posts` },
  children: (
    <>
      <PostsList posts={posts} byYear={true} total={posts.length} />
      <ProgressBar min={1} max={1} current={1} info="1/1 page loaded." />
    </>
  ),
  widgets: [
    <LinksListWidget
      key="sidebar-widget1"
      items={blogCategories}
      title="Categories"
      level={2}
    />,
  ],
};
