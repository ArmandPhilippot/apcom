import { render, screen } from '@test-utils';
import CCBySA from './cc-by-sa';

describe('CCBySA', () => {
  it('renders a CC BY SA icon', () => {
    render(<CCBySA />);
    expect(screen.getByTitle('CC BY SA')).toBeInTheDocument();
  });
});
