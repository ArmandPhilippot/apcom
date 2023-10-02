import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Notice } from './notice';

describe('Notice', () => {
  it('can render an error notice', () => {
    const body = 'culpa sint ut';

    render(<Notice kind="error">{body}</Notice>);

    expect(rtlScreen.getByText(body)).toHaveClass('notice--error');
  });

  it('can render an informative notice', () => {
    const body = 'labore optio rerum';

    render(<Notice kind="info">{body}</Notice>);

    expect(rtlScreen.getByText(body)).toHaveClass('notice--info');
  });

  it('can render a success notice', () => {
    const body = 'dolorem voluptatem velit';

    render(<Notice kind="success">{body}</Notice>);

    expect(rtlScreen.getByText(body)).toHaveClass('notice--success');
  });

  it('can render a warning notice', () => {
    const body = 'ut non nihil';

    render(<Notice kind="warning">{body}</Notice>);

    expect(rtlScreen.getByText(body)).toHaveClass('notice--warning');
  });
});
