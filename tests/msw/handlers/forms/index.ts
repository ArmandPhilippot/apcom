import { createCommentHandler } from './create-comment.handler';
import { sendEmailHandler } from './send-email.handler';

export const formsHandlers = [createCommentHandler, sendEmailHandler];
