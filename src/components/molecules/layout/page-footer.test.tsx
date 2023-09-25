import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { PageFooter } from './page-footer';

describe('PageFooter', () => {
  it('renders a footer element', () => {
    render(<PageFooter />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
