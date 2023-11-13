import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { forwardRef, useImperativeHandle } from 'react';
import { mergeRefs } from './refs';

const refValue = 'minus architecto qui';
const TestComponentWithForwardedRef = forwardRef((_, ref) => {
  useImperativeHandle(ref, () => refValue);
  return null;
});
TestComponentWithForwardedRef.displayName = 'TestComponentWithForwardedRef';

describe('merge-refs', () => {
  it('can merge a ref function with a ref object', () => {
    const refFn = jest.fn();
    const refObj = { current: null };

    const TestComponent = () => (
      <TestComponentWithForwardedRef ref={mergeRefs([refFn, refObj])} />
    );

    render(<TestComponent />);

    expect(refFn).toHaveBeenCalledTimes(1);
    expect(refFn).toHaveBeenLastCalledWith(refValue);
    expect(refObj.current).toBe(refValue);
  });
});
