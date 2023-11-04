import { describe, expect, it } from '@jest/globals';
import { userEvent } from '@testing-library/user-event';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { CommentForm, type CommentFormData } from './comment-form';

describe('CommentForm', () => {
  const user = userEvent.setup();

  it('renders the form fields with a submit button', () => {
    const label = 'Comment form';
    render(<CommentForm aria-label={label} />);

    expect(rtlScreen.getByRole('form')).toHaveAccessibleName(label);
    expect(
      rtlScreen.getByRole('textbox', { name: /^Name:/ })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('textbox', { name: /^Email:/ })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('textbox', { name: /^Website:/ })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('textbox', { name: /^Comment:/ })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('button', { name: /^Publish/ })
    ).toBeInTheDocument();
  });

  /* eslint-disable max-statements */
  it('can submit the form', async () => {
    const onSubmit = jest.fn((_data: CommentFormData) => undefined);
    const values = {
      author: 'Brandon_West93',
      comment: 'Ut aspernatur et aut et ab.',
      email: 'Fannie_Connelly8@example.net',
      website: 'https://example.com',
    } satisfies CommentFormData;

    render(<CommentForm onSubmit={onSubmit} />);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Name:/ }),
      values.author
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Email:/ }),
      values.email
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Website:/ }),
      values.website
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Comment:/ }),
      values.comment
    );
    await user.click(rtlScreen.getByRole('button', { name: /^Publish/ }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(values);
  });
  /* eslint-enable max-statements */

  /* eslint-disable max-statements */
  it('can submit and inform user on success', async () => {
    const successMsg = 'Comment has been saved.';
    const onSubmit = jest.fn((_data: CommentFormData) => {
      return {
        messages: { success: successMsg },
        validator: () => true,
      };
    });
    const values = {
      author: 'Brandon_West93',
      comment: 'Ut aspernatur et aut et ab.',
      email: 'Fannie_Connelly8@example.net',
      parentId: undefined,
      website: '',
    } satisfies CommentFormData;

    render(<CommentForm onSubmit={onSubmit} />);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Name:/ }),
      values.author
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Email:/ }),
      values.email
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Comment:/ }),
      values.comment
    );
    await user.click(rtlScreen.getByRole('button', { name: /^Publish/ }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(values);
    expect(rtlScreen.getByText(successMsg)).toBeInTheDocument();
  });
  /* eslint-enable max-statements */

  /* eslint-disable max-statements */
  it('can abort submit on error and inform user', async () => {
    const errorMsg = 'Cannot save comment.';
    const onSubmit = jest.fn((_data: CommentFormData) => {
      return {
        messages: { error: errorMsg },
        validator: () => false,
      };
    });
    const values = {
      author: 'Brandon_West93',
      comment: 'Ut aspernatur et aut et ab.',
      email: 'Fannie_Connelly8@example.net',
      parentId: undefined,
      website: '',
    } satisfies CommentFormData;

    render(<CommentForm onSubmit={onSubmit} />);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Name:/ }),
      values.author
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Email:/ }),
      values.email
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Comment:/ }),
      values.comment
    );
    await user.click(rtlScreen.getByRole('button', { name: /^Publish/ }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(values);
    expect(rtlScreen.getByText(errorMsg)).toBeInTheDocument();
  });
  /* eslint-enable max-statements */
});
