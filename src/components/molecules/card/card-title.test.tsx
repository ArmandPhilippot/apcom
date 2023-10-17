import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { CardTitle } from './card-title';

describe('CardTitle', () => {
  it('renders a title of level 2', () => {
    const title = 'animi et omnis';

    render(<CardTitle>{title}</CardTitle>);

    expect(rtlScreen.getByRole('heading', { level: 2 })).toHaveTextContent(
      title
    );
  });

  it('can render a title with a custom level', () => {
    const level = 4;
    const title = 'animi et omnis';

    render(<CardTitle level={level}>{title}</CardTitle>);

    expect(rtlScreen.getByRole('heading', { level })).toHaveTextContent(title);
  });
});
