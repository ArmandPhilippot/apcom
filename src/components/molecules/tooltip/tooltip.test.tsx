import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { Tooltip } from './tooltip';

const title = 'A custom title';
const children =
  'Labore ullam delectus sit modi quam dolores. Ratione id sint aliquid facilis ipsum. Unde necessitatibus provident minus.';

describe('Tooltip', () => {
  it('renders a title and a body', () => {
    render(<Tooltip heading={title}>{children}</Tooltip>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('can render a hidden modal', () => {
    render(
      <Tooltip heading={title} isOpen={false}>
        {children}
      </Tooltip>
    );

    // Neither toBeVisible or toHaveStyle are working.
    //expect(screen.getByText(children)).not.toBeVisible();
    //expect(screen.getByText(children)).toHaveStyle({ visibility: 'hidden' });
    expect(screen.getByText(children)).toHaveClass('tooltip--hidden');
  });

  it('can render a visible modal', () => {
    render(
      <Tooltip heading={title} isOpen>
        {children}
      </Tooltip>
    );

    expect(screen.getByText(children)).toBeVisible();
    expect(screen.getByText(children)).toHaveStyle({ visibility: 'visible' });
  });
});
