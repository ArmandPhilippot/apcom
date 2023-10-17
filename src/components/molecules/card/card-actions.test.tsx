import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { CardActions } from './card-actions';

describe('CardActions', () => {
  it('renders its children', () => {
    const actions = 'animi et omnis';

    render(<CardActions>{actions}</CardActions>);

    expect(rtlScreen.getByText(actions)).toBeInTheDocument();
  });

  it('can render its children with start alignment', () => {
    const actions = 'animi et omnis';

    render(<CardActions alignment="start">{actions}</CardActions>);

    expect(rtlScreen.getByText(actions)).toHaveStyle(`--alignment: flex-start`);
  });

  it('can render its children with centered alignment', () => {
    const actions = 'animi et omnis';

    render(<CardActions alignment="center">{actions}</CardActions>);

    expect(rtlScreen.getByText(actions)).toHaveStyle(`--alignment: center`);
  });

  it('can render its children with end alignment', () => {
    const actions = 'animi et omnis';

    render(<CardActions alignment="end">{actions}</CardActions>);

    expect(rtlScreen.getByText(actions)).toHaveStyle(`--alignment: flex-end`);
  });
});
