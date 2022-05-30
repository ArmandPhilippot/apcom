import { render, screen } from '@test-utils';
import Fieldset from './fieldset';
import { body, legend } from './fieldset.fixture';

describe('Fieldset', () => {
  it('renders a legend and a body', () => {
    render(<Fieldset legend={legend}>{body}</Fieldset>);
    expect(screen.findByRole('group', { name: legend })).toBeInTheDocument();
    expect(screen.findByText(body)).toBeInTheDocument();
  });
});
