import { render, screen } from '@test-utils';
import Field from './field';

describe('Field', () => {
  it('renders a text input', () => {
    render(
      <Field
        id="text-field"
        name="text-field"
        type="text"
        value=""
        setValue={() => null}
      />
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('renders a search input', () => {
    render(
      <Field
        id="search-field"
        name="search-field"
        type="search"
        value=""
        setValue={() => null}
      />
    );
    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
  });
});
