import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import { useScrollLock } from './use-scroll-lock';

const body = 'eligendi dolor eos';

const UseScrollLockDemo = ({ isLocked }: { isLocked: boolean }) => {
  useScrollLock(isLocked);

  return <div>{body}</div>;
};

describe('use-scroll-lock', () => {
  it('can disable scroll on body element', () => {
    const { baseElement } = render(<UseScrollLockDemo isLocked />);

    expect(baseElement).toHaveStyle({ overflow: 'hidden' });
  });

  it('can enable scroll on body element', () => {
    const { baseElement } = render(<UseScrollLockDemo isLocked={false} />);

    expect(baseElement).not.toHaveStyle({ overflow: 'hidden' });
  });
});
