import { render, screen } from '@tests/utils';
import Link from './link';

describe('Link', () => {
  it('render a link', () => {
    render(<Link href="#">A link</Link>);
    expect(screen.getByRole('link')).toHaveTextContent('A link');
  });
});
