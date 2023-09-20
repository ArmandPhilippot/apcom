import { render, screen } from '../../../../tests/utils';
import { Notice } from './notice';

const message = 'Tenetur consequuntur tempore.';

describe('Notice', () => {
  it('renders a message', () => {
    render(<Notice kind="info" message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
