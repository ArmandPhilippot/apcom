import { render, screen } from '@test-utils';
import PlusMinus from './plus-minus';

describe('PlusMinus', () => {
  it('renders a plus icon', () => {
    render(<PlusMinus state="plus" ariaHidden={false} ariaLabel="Plus icon" />);
    expect(screen.getByLabelText('Plus icon')).toHaveClass('icon--plus');
  });

  it('renders a minus icon', () => {
    render(
      <PlusMinus state="minus" ariaHidden={false} ariaLabel="Minus icon" />
    );
    expect(screen.getByLabelText('Minus icon')).toHaveClass('icon--minus');
  });
});
