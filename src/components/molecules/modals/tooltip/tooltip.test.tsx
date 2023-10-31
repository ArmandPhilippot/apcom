import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { Tooltip } from './tooltip';

const title = 'A custom title';
const children =
  'Labore ullam delectus sit modi quam dolores. Ratione id sint aliquid facilis ipsum. Unde necessitatibus provident minus.';

describe('Tooltip', () => {
  it('renders a title and a body', () => {
    render(<Tooltip heading={title}>{children}</Tooltip>);

    expect(rtlScreen.getByText(title)).toBeInTheDocument();
    expect(rtlScreen.getByText(children)).toBeInTheDocument();
  });

  it('can render a hidden modal', () => {
    render(
      <Tooltip heading={title} isOpen={false}>
        {children}
      </Tooltip>
    );

    // Neither toBeVisible or toHaveStyle are working.
    //expect(rtlScreen.getByText(children)).not.toBeVisible();
    //expect(rtlScreen.getByText(children)).toHaveStyle({ visibility: 'hidden' });
    expect(rtlScreen.getByText(children)).toHaveClass('tooltip--hidden');
  });

  it('can render a visible modal', () => {
    render(
      <Tooltip heading={title} isOpen>
        {children}
      </Tooltip>
    );

    expect(rtlScreen.getByText(children)).toBeVisible();
    expect(rtlScreen.getByText(children)).toHaveStyle({
      visibility: 'visible',
    });
  });
});
