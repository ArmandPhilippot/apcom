import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Copyright } from './copyright';

const from = '2012';
const to = '2023';
const owner = 'Your name';

describe('Copyright', () => {
  it('renders the copyright symbol, the owner and the start year', () => {
    render(<Copyright from={from} owner={owner} />);

    expect(rtlScreen.getByText(new RegExp(owner))).toBeInTheDocument();
    expect(rtlScreen.getByText(from)).toBeInTheDocument();
  });

  it('can render a copyright with end year', () => {
    render(<Copyright from={from} owner={owner} to={to} />);

    expect(rtlScreen.getByText(from)).toBeInTheDocument();
    expect(rtlScreen.getByText(to)).toBeInTheDocument();
  });
});
