import type { Meta, StoryObj } from '@storybook/react';
import NextImage from 'next/image';
import { wpPostsFixture } from '../../../../tests/fixtures';
import { type PostData, PostsList } from './posts-list';

const meta = {
  component: PostsList,
  title: 'Organisms/PostsList',
} satisfies Meta<typeof PostsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    posts: wpPostsFixture.map((post): PostData => {
      return {
        ...post,
        cover: post.featuredImage ? (
          <NextImage
            alt={post.featuredImage.node.altText ?? ''}
            height={post.featuredImage.node.mediaDetails.height}
            src={post.featuredImage.node.sourceUrl}
            title={post.featuredImage.node.title ?? undefined}
            width={post.featuredImage.node.mediaDetails.width}
          />
        ) : undefined,
        excerpt: post.contentParts.beforeMore,
        heading: post.title,
        id: post.databaseId,
        meta: {
          author: post.author.node.name,
          comments: post.commentCount
            ? {
                count: post.commentCount,
                postHeading: post.title,
              }
            : undefined,
          publicationDate: post.date,
          updateDate: post.modified,
          wordsCount: post.info.wordsCount,
        },
        url: post.slug,
      };
    }),
    total: wpPostsFixture.length,
  },
};

export const WithLoadMoreButton: Story = {
  args: {
    posts: wpPostsFixture
      .map((post): PostData => {
        return {
          ...post,
          cover: post.featuredImage ? (
            <NextImage
              alt={post.featuredImage.node.altText ?? ''}
              height={post.featuredImage.node.mediaDetails.height}
              src={post.featuredImage.node.sourceUrl}
              title={post.featuredImage.node.title ?? undefined}
              width={post.featuredImage.node.mediaDetails.width}
            />
          ) : undefined,
          excerpt: post.contentParts.beforeMore,
          heading: post.title,
          id: post.databaseId,
          meta: {
            author: post.author.node.name,
            comments: post.commentCount
              ? {
                  count: post.commentCount,
                  postHeading: post.title,
                }
              : undefined,
            publicationDate: post.date,
            updateDate: post.modified,
            wordsCount: post.info.wordsCount,
          },
          url: post.slug,
        };
      })
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .slice(0, 5),
    total: wpPostsFixture.length,
  },
};
