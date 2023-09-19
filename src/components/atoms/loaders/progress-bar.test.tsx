import { render, screen } from '../../../../tests/utils';
import ProgressBar from './progress-bar';
import { current, id, label, max, min } from './progress-bar.fixture';

describe('ProgressBar', () => {
  it('renders a progress bar', () => {
    render(
      <ProgressBar
        id={id}
        label={label}
        min={min}
        max={max}
        current={current}
      />
    );
    expect(
      screen.getByRole('progressbar', { name: label })
    ).toBeInTheDocument();
  });
});
