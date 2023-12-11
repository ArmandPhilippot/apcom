import { describe, expect, it } from '@jest/globals';
import { type CreateCommentInput, createComment } from './create-comment';

describe('create-comment', () => {
  it('successfully create a new comment', async () => {
    const email: CreateCommentInput = {
      author: 'Bruce_Lowe12',
      authorEmail: 'Wiley_Wolf18@example.net',
      authorUrl: '',
      clientMutationId: 'aliquid',
      commentOn: 2,
      content: 'Error vel fugit nisi accusantium.',
    };
    const result = await createComment(email);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    expect(result.clientMutationId).toBe(email.clientMutationId);
    expect(result.comment?.approved).toBe(true);
    expect(result.success).toBe(true);
  });
});
