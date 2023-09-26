import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { BackToTop } from './back-to-top';

describe('BackToTop', () => {
  it('renders a BackToTop link', () => {
    const id = 'top';

    render(<BackToTop to={id} />);

    expect(rtlScreen.getByRole('link')).toHaveAccessibleName('Back to top');
    expect(rtlScreen.getByRole('link')).toHaveAttribute('href', `#${id}`);
  });
});
