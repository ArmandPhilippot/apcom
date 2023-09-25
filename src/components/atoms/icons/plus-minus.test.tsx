import { describe, expect, it } from '@jest/globals';
import { render } from '../../../../tests/utils';
import { PlusMinus } from './plus-minus';

describe('PlusMinus', () => {
  it('renders a plus/minus icon', () => {
    const { container } = render(<PlusMinus state="plus" />);
    expect(container).toBeDefined();
  });
});
