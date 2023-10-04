import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { VisuallyHidden } from './visually-hidden';

describe('VisuallyHidden', () => {
  it('renders its body', () => {
    const body = 'natus vero doloremque';

    render(<VisuallyHidden>{body}</VisuallyHidden>);

    expect(rtlScreen.getByText(body)).toBeInTheDocument();
  });
});
