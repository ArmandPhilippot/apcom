import { type ExecutionResult, graphql } from 'graphql';
import { HttpResponse } from 'msw';
import type {
  SendEmail,
  SendEmailInput,
  SendEmailResponse,
} from '../../../../src/services/graphql';
import { CONFIG } from '../../../../src/utils/config';
import { wordpressAPI } from '../../instances';
import { schema } from '../../schema';

export const sendEmailHandler = wordpressAPI.mutation<
  SendEmailResponse,
  Record<'input', SendEmailInput>
>('SendEmail', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError)
    return HttpResponse.json({
      data: {
        sendEmail: {
          clientMutationId: null,
          message: 'Not allowed.',
          origin: CONFIG.url,
          replyTo: '',
          sent: false,
        },
      },
    });

  const { data, errors } = (await graphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      sendEmail({ input }: typeof variables): SendEmail {
        const { body, clientMutationId, replyTo, subject } = input;
        const message = `Object: ${subject}\n\n${body}`;

        return {
          clientMutationId,
          message,
          origin: CONFIG.url,
          replyTo,
          sent: replyTo.includes('@'),
        };
      },
    },
  })) as ExecutionResult<SendEmailResponse>;

  return HttpResponse.json({ data, errors });
});
