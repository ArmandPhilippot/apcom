import { render, screen } from '@test-utils';
import Field from './field';

describe('Field', () => {
  it('renders a text input', () => {
    render(<Field type="text" value="" setValue={() => null} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('renders a search input', () => {
    render(<Field type="search" value="" setValue={() => null} />);
    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
  });
});
