import { render, screen } from '../../../../tests/utils';
import LabelledSelect from './labelled-select';

const selectOptions = [
  { id: 'option1', name: 'Option 1', value: 'option1' },
  { id: 'option2', name: 'Option 2', value: 'option2' },
  { id: 'option3', name: 'Option 3', value: 'option3' },
];

describe('LabelledSelect', () => {
  it('renders a labelled select', () => {
    render(
      <LabelledSelect
        id="jest-select-field"
        name="jest-select-field"
        label="Jest select field"
        options={selectOptions}
        value="option1"
        setValue={() => null}
      />
    );
    expect(screen.getByLabelText('Jest select field')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('option1');
  });
});
