import { render, screen } from '../../../../../../tests/utils';
import { Select } from './select';

const doNothing = () => {
  // do nothing
};

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
        id="select-1"
        name="select-1"
        onChange={doNothing}
        options={selectOptions}
        value={selected.value}
      />
    );

    expect(screen.getByRole('combobox')).toHaveValue(selected.value);
  });

  it('renders the select options', () => {
    render(
      <Select
        id="select-2"
        name="select-2"
        onChange={doNothing}
        options={selectOptions}
        value={selected.value}
      />
    );

    expect(screen.getAllByRole('option')).toHaveLength(selectOptions.length);
  });
});
