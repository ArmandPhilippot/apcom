import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { Button } from './button';

describe('Button', () => {
  it('renders the Button component', () => {
    render(<Button onClick={() => null}>Button</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the Button component with disabled state', () => {
    render(
      <Button onClick={() => null} disabled={true}>
        Disabled Button
      </Button>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
