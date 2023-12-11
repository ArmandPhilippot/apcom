import { describe, expect, it } from '@jest/globals';
import { type SendEmailInput, sendEmail } from './send-email';

describe('send-email', () => {
  it('successfully sends an email', async () => {
    const email: SendEmailInput = {
      body: 'Natus soluta et.',
      clientMutationId: 'qui',
      replyTo: 'Nina.Jerde@example.net',
      subject: 'quaerat odio veritatis',
    };
    const result = await sendEmail(email);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(5);

    expect(result.clientMutationId).toBe(email.clientMutationId);
    expect(result.message).toBeDefined();
    expect(result.origin).toBeDefined();
    expect(result.replyTo).toBe(email.replyTo);
    expect(result.sent).toBe(true);
  });
});
