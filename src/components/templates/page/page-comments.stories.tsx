import type { Meta, StoryObj } from '@storybook/react';
import type { CommentData } from '../../organisms';
import { Page } from './page';
import { PageComments, type PageCommentsProps } from './page-comments';

const WrappedPageComments = (props: PageCommentsProps) => (
  <Page>
    <PageComments {...props} />
  </Page>
);

const meta = {
  component: PageComments,
  title: 'Templates/Page/PageComments',
  render: WrappedPageComments,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageComments>;

export default meta;

type Story = StoryObj<typeof meta>;

const comments = [
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
        author: { name: 'Hanna49', website: 'https://www.armandphilippot.com' },
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
    content: 'Ea fugit totam et voluptatum quidem laborum explicabo fuga quod.',
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
] satisfies CommentData[];

export const WithoutComments: Story = {
  args: {
    comments: [],
    pageId: 1,
  },
};

export const WithComments: Story = {
  args: {
    comments,
    depth: 2,
    pageId: 1,
  },
};

export const WithCommentsClosed: Story = {
  args: {
    areCommentsClosed: true,
    comments,
    depth: 2,
    pageId: 1,
  },
};
