import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { ProgressBar } from './progress-bar';

describe('ProgressBar', () => {
  it('renders a progress bar', () => {
    const max = 50;
    const current = 10;
    const label = `${current} loaded out of a total of ${max}`;

    render(<ProgressBar current={current} label={label} max={max} />);

    expect(
      rtlScreen.getByRole('progressbar', { name: label })
    ).toBeInTheDocument();
  });

  it('can render a progress bar with loading state', () => {
    const max = 50;
    const current = 10;
    const label = `${current} loaded out of a total of ${max}`;

    render(<ProgressBar current={current} isLoading label={label} max={max} />);

    const progressBar = rtlScreen.getByRole('progressbar', { name: label });

    expect(progressBar).not.toHaveValue();
    expect(progressBar.parentElement).toHaveClass('progress--loading');
  });

  it('can render a centered progress bar', () => {
    const max = 50;
    const current = 10;
    const label = `${current} loaded out of a total of ${max}`;

    render(
      <ProgressBar current={current} isCentered label={label} max={max} />
    );

    expect(
      rtlScreen.getByRole('progressbar', { name: label }).parentElement
        ?.parentElement
    ).toHaveClass('wrapper--centered');
  });
});
