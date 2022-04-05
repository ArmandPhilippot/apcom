import { render, screen } from '@test-utils';
import ProgressBar from './progress-bar';

describe('ProgressBar', () => {
  it('renders a progress bar', () => {
    render(<ProgressBar min={0} max={50} current={10} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
