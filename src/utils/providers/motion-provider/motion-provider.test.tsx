import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { type FC, useContext } from 'react';
import { MotionContext, MotionProvider } from './motion-provider';

const bodyPrefix = 'Motion is reduced:';

const ComponentTest: FC = () => {
  const { isReduced } = useContext(MotionContext);

  return (
    <div>
      {bodyPrefix} {`${isReduced}`}
    </div>
  );
};

describe('MotionProvider', () => {
  it('uses the default value when the provider is not used', () => {
    const defaultValue = false;

    render(<ComponentTest />);

    expect(rtlScreen.getByText(new RegExp(bodyPrefix))).toHaveTextContent(
      `${bodyPrefix} ${defaultValue}`
    );
  });

  it('provides the given value to its children and set a matching attribute', () => {
    const attribute = 'eius';
    const isReduced = true;

    const { baseElement } = render(
      <MotionProvider
        attribute={attribute}
        storageKey="aperiam"
        hasReducedMotion={isReduced}
      >
        <ComponentTest />
      </MotionProvider>
    );

    expect(rtlScreen.getByText(new RegExp(bodyPrefix))).toHaveTextContent(
      `${bodyPrefix} ${isReduced}`
    );
    expect(baseElement.parentElement?.getAttribute(`data-${attribute}`)).toBe(
      `${isReduced}`
    );
  });
});
