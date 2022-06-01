import { render, screen } from '@tests/utils';
import LabelledBooleanField from './labelled-boolean-field';
import { label } from './labelled-boolean-field.fixture';

describe('LabelledBooleanField', () => {
  it('renders a labelled checkbox', () => {
    render(
      <LabelledBooleanField
        checked={true}
        id="jest-checkbox-field"
        label={label}
        name="jest-checkbox-field"
        onChange={() => null}
        type="checkbox"
        value="checkbox"
      />
    );
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders a labelled radio option', () => {
    render(
      <LabelledBooleanField
        checked={true}
        id="jest-radio-field"
        label={label}
        name="jest-radio-field"
        onChange={() => null}
        type="radio"
        value="radio"
      />
    );
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeChecked();
  });
});
