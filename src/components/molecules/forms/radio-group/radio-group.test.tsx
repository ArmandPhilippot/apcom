import { render, screen } from '../../../../../tests/utils';
import { Legend } from '../../../atoms';
import { RadioGroup } from './radio-group';
import { getOptions, initialChoice } from './radio-group.fixture';

const doNothing = () => {
  /* Do nothing. */
};

describe('RadioGroup', () => {
  it('renders a legend', () => {
    const legend = 'Options:';

    render(
      <RadioGroup
        legend={<Legend>{legend}</Legend>}
        name="possimus"
        onSwitch={doNothing}
        options={getOptions()}
        value={initialChoice}
      />
    );

    expect(
      screen.getByRole('radiogroup', { name: legend })
    ).toBeInTheDocument();
  });

  it('renders the correct number of radio', () => {
    const options = getOptions();

    render(
      <RadioGroup
        name="eaque"
        onSwitch={doNothing}
        options={options}
        value={initialChoice}
      />
    );

    expect(screen.getAllByRole('radio')).toHaveLength(options.length);
  });

  it('can render an inlined radio group', () => {
    const options = getOptions();

    render(
      <RadioGroup
        isInline
        name="architecto"
        onSwitch={doNothing}
        options={options}
        value={initialChoice}
      />
    );

    expect(screen.getByRole('radiogroup')).toHaveClass('group--inline');
  });
});
