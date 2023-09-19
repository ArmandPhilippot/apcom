import { render, screen } from '../../../../tests/utils';
import Form from './form';

describe('Form', () => {
  it('renders a form', () => {
    render(
      <Form aria-label="Jest form" onSubmit={() => null}>
        Fields
      </Form>
    );
    expect(screen.getByRole('form', { name: 'Jest form' })).toBeInTheDocument();
  });
});
