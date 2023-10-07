import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Flip } from './flip';
import { FlipSide } from './flip-side';

describe('Flip', () => {
  it('renders the back and front sides', () => {
    const front = 'laboriosam sint rem';
    const back = 'tempore autem ea';

    render(
      <Flip>
        <FlipSide>{front}</FlipSide>
        <FlipSide isBack>{back}</FlipSide>
      </Flip>
    );

    expect(rtlScreen.getByText(front)).toBeInTheDocument();
    expect(rtlScreen.getByText(back)).toBeInTheDocument();
  });

  it('can be animated horizontally', () => {
    const front = 'repudiandae maiores sunt';
    const back = 'facilis nostrum voluptatibus';

    render(
      <Flip direction="horizontal">
        <FlipSide>{front}</FlipSide>
        <FlipSide isBack>{back}</FlipSide>
      </Flip>
    );

    expect(rtlScreen.getByText(front).parentElement).toHaveClass(
      'wrapper--horizontal'
    );
  });

  it('can be animated vertically', () => {
    const front = 'quis et id';
    const back = 'quis est itaque';

    render(
      <Flip direction="vertical">
        <FlipSide>{front}</FlipSide>
        <FlipSide isBack>{back}</FlipSide>
      </Flip>
    );

    expect(rtlScreen.getByText(front).parentElement).toHaveClass(
      'wrapper--vertical'
    );
  });

  it('can be animated manually', () => {
    const front = 'quis et id';
    const back = 'quis est itaque';

    render(
      <Flip showBack>
        <FlipSide>{front}</FlipSide>
        <FlipSide isBack>{back}</FlipSide>
      </Flip>
    );

    expect(rtlScreen.getByText(front).parentElement).toHaveClass(
      'wrapper--manual'
    );
    expect(rtlScreen.getByText(front).parentElement).toHaveClass(
      'wrapper--is-back'
    );
  });
});
