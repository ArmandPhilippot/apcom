import { render, screen } from '@test-utils';
import RadioGroup from './radio-group';
import { getOptions, initialChoice, legend } from './radio-group.fixture';

describe('RadioGroup', () => {
  it('renders a legend', () => {
    render(
      <RadioGroup
        initialChoice={initialChoice}
        legend={legend}
        options={getOptions()}
      />
    );
    expect(screen.findByRole('radiogroup', { name: legend })).toBeDefined();
  });

  it('renders the correct number of radio', () => {
    const options = getOptions();

    render(
      <RadioGroup
        initialChoice={initialChoice}
        legend={legend}
        options={options}
      />
    );
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(options.length);
  });
});
