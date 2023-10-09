import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Figure } from './figure';

describe('Figure', () => {
  it('renders the figure contents', () => {
    const body = 'tempora et quis';

    render(<Figure>{body}</Figure>);

    expect(rtlScreen.getByRole('figure')).toHaveTextContent(body);
  });

  it('can render its contents with a caption', () => {
    const body = 'tempora et quis';
    const caption = 'velit dolores magnam';

    render(<Figure caption={caption}>{body}</Figure>);

    expect(rtlScreen.getByRole('figure', { name: caption })).toHaveTextContent(
      body
    );
  });

  it('can style the figure with borders', () => {
    const body = 'tempora et quis';

    render(<Figure hasBorders>{body}</Figure>);

    expect(rtlScreen.getByRole('figure')).toHaveClass('wrapper--has-borders');
  });
});
