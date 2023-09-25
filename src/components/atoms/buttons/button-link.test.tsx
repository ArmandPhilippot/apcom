import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { ButtonLink } from './button-link';

describe('ButtonLink', () => {
  it('renders a ButtonLink component', () => {
    render(<ButtonLink target="#">Button Link</ButtonLink>);
    expect(screen.getByRole('link')).toHaveTextContent('Button Link');
  });
});
