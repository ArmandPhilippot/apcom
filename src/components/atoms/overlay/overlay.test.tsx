import { describe, expect, it } from '@jest/globals';
import { render, screen as screenTL } from '@testing-library/react';
import { Overlay } from './overlay';

describe('overlay', () => {
  it('renders its children in front of an overlay', () => {
    const body = 'perferendis voluptatibus ut';

    render(<Overlay>{body}</Overlay>);

    expect(screenTL.getByText(body)).toHaveClass('overlay--visible');
  });

  it('can be hidden', () => {
    const body = 'vel aspernatur mollitia';

    render(<Overlay isVisible={false}>{body}</Overlay>);

    expect(screenTL.getByText(body)).toHaveClass('overlay--hidden');
  });
});
