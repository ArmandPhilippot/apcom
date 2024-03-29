import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
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
      rtlScreen.getByRole('radiogroup', { name: legend })
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

    expect(rtlScreen.getAllByRole('radio')).toHaveLength(options.length);
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

    expect(rtlScreen.getByRole('radiogroup')).toHaveClass('group--inline');
  });
});
