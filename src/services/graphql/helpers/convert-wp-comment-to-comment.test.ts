import { describe, expect, it } from '@jest/globals';
import type { WPComment } from '../../../types';
import { convertWPCommentToComment } from './convert-wp-comment-to-comment';

describe('convert-wp-comment-to-comment', () => {
  it('converts a WPComment object to a Comment object', () => {
    const comment: WPComment = {
      approved: true,
      author: {
        node: {
          avatar: null,
          name: 'Maribel.Roberts',
          url: null,
        },
      },
      content: 'Aliquam qui et facere consequatur quia.',
      databaseId: 4,
      date: '2023-10-15',
      parentDatabaseId: 1,
      status: 'HOLD',
    };

    const transformedComment = convertWPCommentToComment(comment);

    expect(transformedComment.content).toBe(comment.content);
    expect(transformedComment.id).toBe(comment.databaseId);
    expect(transformedComment.isApproved).toBe(comment.approved);
    expect(transformedComment.meta.author.avatar).toBeUndefined();
    expect(transformedComment.meta.author.name).toBe(comment.author.node.name);
    expect(transformedComment.meta.author.website).toBeUndefined();
    expect(transformedComment.parentId).toBe(comment.parentDatabaseId);
    expect(transformedComment.replies).toStrictEqual([]);
  });

  it('can convert the avatar', () => {
    const comment: WPComment = {
      approved: true,
      author: {
        node: {
          avatar: {
            height: 80,
            url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/426.jpg',
            width: 80,
          },
          name: 'Maribel.Roberts',
          url: null,
        },
      },
      content: 'Aliquam qui et facere consequatur quia.',
      databaseId: 4,
      date: '2023-10-15',
      parentDatabaseId: 1,
      status: 'HOLD',
    };

    const transformedComment = convertWPCommentToComment(comment);

    expect(transformedComment.meta.author.avatar?.alt).toBe(
      `${comment.author.node.name} avatar`
    );
    expect(transformedComment.meta.author.avatar?.height).toBe(
      comment.author.node.avatar?.height
    );
    expect(transformedComment.meta.author.avatar?.src).toBe(
      comment.author.node.avatar?.url
    );
    expect(transformedComment.meta.author.avatar?.width).toBe(
      comment.author.node.avatar?.width
    );
  });

  it('can remove the parentId when not meaningful', () => {
    const comment: WPComment = {
      approved: true,
      author: {
        node: {
          avatar: null,
          name: 'Maribel.Roberts',
          url: null,
        },
      },
      content: 'Aliquam qui et facere consequatur quia.',
      databaseId: 4,
      date: '2023-10-15',
      parentDatabaseId: 0,
      status: 'HOLD',
    };

    const transformedComment = convertWPCommentToComment(comment);

    expect(transformedComment.parentId).toBeUndefined();
  });
});
