import { render, screen } from '@test-utils';
import FlippingLabel from './flipping-label';

describe('FlippingLabel', () => {
  it('renders a label', () => {
    const ariaLabel = 'vero quo inventore';
    render(
      <FlippingLabel aria-label={ariaLabel} isActive={false}>
        <>Test</>
      </FlippingLabel>
    );
    expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
  });
});
