import { render, screen } from '../../../../tests/utils';
import { Fieldset } from './fieldset';
import { body, legend, Tooltip } from './fieldset.fixture';

describe('Fieldset', () => {
  // Cannot use toBeInTheDocument because of body is not an HTMLElement.

  it('renders a legend and a body', () => {
    render(<Fieldset legend={legend}>{body}</Fieldset>);
    expect(screen.findByRole('group', { name: legend })).toBeTruthy();
    expect(screen.findByText(body)).toBeTruthy();
  });

  it('renders a button to open a tooltip', () => {
    render(
      <Fieldset legend={legend} Tooltip={Tooltip}>
        {body}
      </Fieldset>
    );
    expect(screen.findByRole('button', { name: /Help/i })).toBeTruthy();
  });
});
