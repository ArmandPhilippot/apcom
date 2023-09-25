import { describe, expect, it } from '@jest/globals';
import { render } from '../../../../tests/utils';
import { Home } from './home';

describe('Home', () => {
  it('renders a home icon', () => {
    const { container } = render(<Home />);
    expect(container).toBeDefined();
  });
});
