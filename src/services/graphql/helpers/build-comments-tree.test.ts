import { describe, expect, it } from '@jest/globals';
import type { SingleComment } from '../../../types';
import { buildCommentsTree } from './build-comments-tree';

describe('build-comments-tree', () => {
  it('transforms a flat comments array to a comments tree', () => {
    const firstComment = {
      content: 'Non non provident mollitia a.',
      id: 1,
      isApproved: true,
      meta: { author: { name: 'Emma_Muller' }, date: '2022-11-02' },
      replies: [],
    } satisfies SingleComment;
    const firstCommentReplies = [
      {
        content: 'Et omnis voluptatem est atque.',
        id: 3,
        isApproved: true,
        meta: { author: { name: 'Patrick.Goodwin44' }, date: '2022-11-05' },
        replies: [],
        parentId: 1,
      },
    ] satisfies SingleComment[];
    const secondComment = {
      content: 'Vero iure architecto modi iusto qui.',
      id: 2,
      isApproved: true,
      meta: { author: { name: 'Dominique13' }, date: '2022-11-04' },
      replies: [],
    } satisfies SingleComment;
    const secondCommentReplies = [
      {
        content: 'Qui quaerat quas quia praesentium quasi.',
        id: 4,
        isApproved: true,
        meta: { author: { name: 'Patrick.Goodwin44' }, date: '2022-11-05' },
        replies: [],
        parentId: 2,
      },
      {
        content: 'Ut officia aliquid harum voluptas molestiae quo.',
        id: 5,
        isApproved: true,
        meta: { author: { name: 'Ariel.Braun6' }, date: '2022-11-06' },
        replies: [],
        parentId: 2,
      },
    ] satisfies SingleComment[];
    const comments: SingleComment[] = [
      firstComment,
      secondComment,
      ...firstCommentReplies,
      ...secondCommentReplies,
    ];
    const result = buildCommentsTree(comments);

    expect(result).toHaveLength(2);
    expect(result[0]).toStrictEqual({
      ...firstComment,
      replies: firstCommentReplies,
    });
    expect(result[1]).toStrictEqual({
      ...secondComment,
      replies: secondCommentReplies,
    });
  });
});
