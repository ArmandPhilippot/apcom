import { render, screen } from '@test-utils';
import Form from './form';

describe('Form', () => {
  it('renders a form', () => {
    render(<Form aria-label="Jest form" onSubmit={() => null}></Form>);
    expect(screen.getByRole('form', { name: 'Jest form' })).toBeInTheDocument();
  });
});
