import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('renders a spinner', () => {
    const { container } = render(<Spinner />);
    expect(container).toBeInTheDocument();
  });

  it('can render a spinner with a custom message', () => {
    const customMsg = 'Submitting';

    render(<Spinner>{customMsg}</Spinner>);
    expect(rtlScreen.getByText(customMsg)).toBeInTheDocument();
  });

  it('can render a spinner with a custom message at the bottom', () => {
    const customMsg = 'necessitatibus';

    render(<Spinner position="bottom">{customMsg}</Spinner>);
    expect(rtlScreen.getByText(customMsg).parentElement).toHaveClass(
      'wrapper--bottom'
    );
  });

  it('can render a spinner with a custom message on the left', () => {
    const customMsg = 'eos';

    render(<Spinner position="left">{customMsg}</Spinner>);
    expect(rtlScreen.getByText(customMsg).parentElement).toHaveClass(
      'wrapper--left'
    );
  });

  it('can render a spinner with a custom message on the right', () => {
    const customMsg = 'neque';

    render(<Spinner position="right">{customMsg}</Spinner>);
    expect(rtlScreen.getByText(customMsg).parentElement).toHaveClass(
      'wrapper--right'
    );
  });

  it('can render a spinner with a custom message on the top', () => {
    const customMsg = 'vero';

    render(<Spinner position="top">{customMsg}</Spinner>);
    expect(rtlScreen.getByText(customMsg).parentElement).toHaveClass(
      'wrapper--top'
    );
  });
});
