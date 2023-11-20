import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { PageBody } from './page-body';

describe('PageBody', () => {
  it('renders its contents', () => {
    const body =
      'Consectetur deleniti laboriosam vel velit optio voluptate qui. Possimus voluptatem eos enim labore debitis iure eveniet aspernatur quibusdam. Accusamus dolore quos explicabo recusandae in illo ipsam incidunt.';

    render(<PageBody>{body}</PageBody>);

    expect(rtlScreen.getByText(body)).toBeInTheDocument();
  });
});
