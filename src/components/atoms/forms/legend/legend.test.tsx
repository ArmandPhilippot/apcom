import { render, screen } from '../../../../../tests/utils';
import { Fieldset } from '../fieldset';
import { Legend } from './legend';

describe('legend', () => {
  it('renders the fieldset legend', () => {
    const body = 'deserunt';

    render(
      <Fieldset>
        <Legend>{body}</Legend>
      </Fieldset>
    );

    expect(screen.getByRole('group')).toHaveTextContent(body);
  });
});
