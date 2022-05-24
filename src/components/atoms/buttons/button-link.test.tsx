import { render, screen } from '@test-utils';
import ButtonLink from './button-link';

describe('ButtonLink', () => {
  it('renders a ButtonLink component', () => {
    render(<ButtonLink target="#">Button Link</ButtonLink>);
    expect(screen.getByRole('link')).toHaveTextContent('Button Link');
  });
});
