import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ButtonLink, Heading, Link } from '../../atoms';
import { LinksListWidget, PostsList, Sharing } from '../../organisms';
import { LayoutBase } from '../layout/layout.stories';
import { PageLayout as PageLayoutComponent } from './page-layout';

/**
 * PageLayout - Storybook Meta
 */
export default {
  title: 'Templates/Page',
  component: PageLayoutComponent,
  args: {
    allowComments: false,
    breadcrumbSchema: [],
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
    bodyAttributes: {
      description: 'Set additional HTML attributes to the main content body.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    bodyClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the main content body.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
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
    breadcrumbSchema: {
      control: {
        type: null,
      },
      description: 'The JSON schema for breadcrumb items.',
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
  decorators: [
    (Story, context) => (
      <LayoutBase
        useGrid={true}
        withExtraPadding={!context.args.allowComments && !context.args.comments}
        {...LayoutBase.args}
      >
        <Story />
      </LayoutBase>
    ),
  ],
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
    />,
  ],
  withToC: true,
};

const postBreadcrumb = [
  { id: 'home', url: '#', name: 'Home' },
  { id: 'blog', url: '#', name: 'Blog' },
  { id: 'post', url: '#', name: pageTitle },
];

/**
 * Page Layout Stories - Post
 */
export const Post = Template.bind({});
Post.args = {
  breadcrumb: postBreadcrumb,
  title: pageTitle,
  intro: pageIntro,
  headerMeta: [
    { id: 'publication-date', label: 'Published on:', value: '2020-03-14' },
    {
      id: 'thematics',
      label: 'Thematics:',
      value: [
        {
          id: 'cat-1',
          value: (
            <Link key="cat1" href="#">
              Cat 1
            </Link>
          ),
        },
        {
          id: 'cat-2',
          value: (
            <Link key="cat2" href="#">
              Cat 2
            </Link>
          ),
        },
      ],
    },
  ],
  footerMeta: [
    {
      id: 'read-more',
      label: 'Read more about:',
      value: <ButtonLink to="#">Topic 1</ButtonLink>,
    },
  ],
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
    />,
  ],
  withToC: true,
  comments: [
    {
      author: {
        name: 'Milan0',
        avatar: {
          alt: 'Milan0 avatar',
          src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/976.jpg',
        },
      },
      content: 'Fugit veniam quas qui dolor explicabo.',
      id: 1,
      isApproved: true,
      publicationDate: '2023-01-23',
      replies: [
        {
          author: { name: 'Haskell42' },
          content: 'Error quas accusamus nesciunt enim quae a.',
          id: 25,
          isApproved: true,
          publicationDate: '2023-02-04',
        },
        {
          author: {
            name: 'Hanna49',
            website: 'https://www.armandphilippot.com',
          },
          content: 'Ut ducimus neque aliquam soluta sed totam commodi cum sit.',
          id: 30,
          isApproved: true,
          publicationDate: '2023-03-10',
        },
      ],
    },
    {
      author: {
        name: 'Corrine9',
        avatar: {
          alt: 'Corrine9 avatar',
          src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/539.jpg',
        },
      },
      content:
        'Dolore hic iure voluptatum quam error minima. Quas ut aperiam sit commodi cumque consequatur. Voluptas debitis veritatis officiis in voluptas ea et laborum animi. Voluptatem qui enim neque. Et sunt quo neque assumenda iure. Non vel ut consectetur.',
      id: 2,
      isApproved: true,
      publicationDate: '2023-04-20',
    },
    {
      author: { name: 'Presley12' },
      content:
        'Nulla eaque similique recusandae enim aut eligendi iure consequatur. Et aut qui. Voluptatem a voluptatem consequatur aliquid distinctio ex culpa. Adipisci animi amet reprehenderit autem quia commodi voluptatum commodi.',
      id: 3,
      isApproved: true,
      publicationDate: '2023-05-01',
      replies: [
        {
          author: {
            name: 'Ana_Haley33',
            avatar: {
              alt: 'Ana_Haley33 avatar',
              src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/881.jpg',
            },
          },
          content: 'Ab ea et fugit autem.',
          id: 17,
          isApproved: true,
          publicationDate: '2023-05-01',
        },
        {
          author: { name: 'Santos.Harris17' },
          content:
            'Illo dolores voluptatem similique voluptas quasi hic aspernatur ab nisi.',
          id: 18,
          isApproved: false,
          publicationDate: '2023-05-02',
        },
      ],
    },
    {
      author: { name: 'Julius.Borer' },
      content:
        'Ea fugit totam et voluptatum quidem laborum explicabo fuga quod.',
      id: 4,
      isApproved: true,
      publicationDate: '2023-06-15',
    },
    {
      author: { name: 'Geo87' },
      content:
        'Enim consequatur deleniti aliquid adipisci. Et mollitia saepe vel rerum totam praesentium assumenda repellat fuga. Ipsum ut architecto consequatur. Ut laborum suscipit sed corporis quas aliquid. Et et omnis quo. Dolore quia ipsum ut corporis eum et corporis qui.',
      id: 5,
      isApproved: false,
      publicationDate: '2023-06-16',
    },
    {
      author: { name: 'Kurt.Keeling' },
      content: 'Eligendi repellat officiis amet.',
      id: 6,
      isApproved: true,
      publicationDate: '2023-06-17',
    },
  ],
  allowComments: true,
};

const postsListBreadcrumb = [
  { id: 'home', url: '#', name: 'Home' },
  { id: 'blog', url: '#', name: 'Blog' },
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

const posts = [
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
];

/**
 * Page Layout Stories - Posts list
 */
export const Blog = Template.bind({});
Blog.args = {
  breadcrumb: postsListBreadcrumb,
  title: 'Blog',
  headerMeta: [{ id: 'total', label: 'Total:', value: `${posts.length}` }],
  children: <PostsList posts={posts} sortByYear />,
  widgets: [
    <LinksListWidget
      heading={
        <Heading isFake level={3}>
          Categories
        </Heading>
      }
      items={blogCategories}
      key="sidebar-widget1"
    />,
  ],
};
