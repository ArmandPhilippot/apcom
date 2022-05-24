import { render, screen } from '@test-utils';
import NoScript from './no-script';

const message = 'A noscript message.';

describe('NoScript', () => {
  it('renders a message', () => {
    render(<NoScript message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
