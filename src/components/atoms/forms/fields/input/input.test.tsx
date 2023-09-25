import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../../../tests/utils';
import { Input } from './input';

const doNothing = () => {
  // do nothing
};

describe('Input', () => {
  it('renders a text input', () => {
    render(
      <Input
        id="text-field"
        name="text-field"
        onChange={doNothing}
        type="text"
        value=""
      />
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('renders a search input', () => {
    render(
      <Input
        id="search-field"
        name="search-field"
        onChange={doNothing}
        type="search"
        value=""
      />
    );
    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
  });
});
