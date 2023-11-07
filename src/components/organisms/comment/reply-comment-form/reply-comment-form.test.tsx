import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { Heading } from '../../../atoms';
import { ReplyCommentForm } from './reply-comment-form';

describe('ReplyCommentForm', () => {
  it('renders a form with a heading', () => {
    const commentId = 5;
    const heading = 'odio autem voluptas';
    const headingLvl = 3;

    render(
      <ReplyCommentForm
        commentId={commentId}
        heading={<Heading level={headingLvl}>{heading}</Heading>}
      />
    );

    expect(
      rtlScreen.getByRole('heading', { level: headingLvl })
    ).toHaveTextContent(heading);
    expect(rtlScreen.getByRole('form')).toHaveAccessibleName(
      `Leave a reply to comment ${commentId}`
    );
  });
});
