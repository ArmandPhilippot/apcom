import { render, screen } from '@test-utils';
import SelectWithTooltip from './select-with-tooltip';

const selectOptions = [
  { id: 'option1', name: 'Option 1', value: 'option1' },
  { id: 'option2', name: 'Option 2', value: 'option2' },
  { id: 'option3', name: 'Option 3', value: 'option3' },
];
const selectLabel = 'Jest select';
const selectValue = selectOptions[0].value;
const tooltipTitle = 'Jest tooltip';
const tooltipContent = 'Nesciunt voluptatibus voluptatem omnis at quia libero.';

describe('SelectWithTooltip', () => {
  it('renders a select', () => {
    render(
      <SelectWithTooltip
        id="jest-select"
        name="jest-select"
        label={selectLabel}
        options={selectOptions}
        value={selectValue}
        setValue={() => null}
        title={tooltipTitle}
        content={tooltipContent}
      />
    );
    expect(screen.getByRole('combobox', { name: selectLabel })).toHaveValue(
      selectValue
    );
  });
});
