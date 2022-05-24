import { render, screen } from '@test-utils';
import Select from './select';

const selectOptions = [
  { id: 'option1', name: 'Option 1', value: 'option1' },
  { id: 'option2', name: 'Option 2', value: 'option2' },
  { id: 'option3', name: 'Option 3', value: 'option3' },
];
const selected = selectOptions[0];

describe('Select', () => {
  it('should correctly set default option', () => {
    render(
      <Select
        id="jest-select"
        name="jest-select"
        options={selectOptions}
        value={selected.value}
        setValue={() => null}
      />
    );
    expect(screen.getByRole('combobox')).toHaveValue(selected.value);
    expect(screen.queryByRole('combobox')).not.toHaveValue(
      selectOptions[1].value
    );
    expect(screen.queryByRole('combobox')).not.toHaveValue(
      selectOptions[2].value
    );
  });
});
