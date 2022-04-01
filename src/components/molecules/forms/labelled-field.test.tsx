import { render, screen } from '@test-utils';
import LabelledField from './labelled-field';

describe('LabelledField', () => {
  it('renders a labelled field', () => {
    render(
      <LabelledField
        type="text"
        id="jest-text-field"
        name="jest-text-field"
        label="Jest text field"
        value="test"
        setValue={() => null}
      />
    );
    expect(screen.getByLabelText('Jest text field')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('test');
  });
});
