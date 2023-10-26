import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { type FC, useContext } from 'react';
import type { AckeeTrackerValue } from '../../../types';
import { AckeeContext, AckeeProvider } from './ackee-provider';

const bodyPrefix = 'Tracking is set to:';

const ComponentTest: FC = () => {
  const { tracking } = useContext(AckeeContext);

  return (
    <div>
      {bodyPrefix} {tracking}
    </div>
  );
};

describe('AckeeProvider', () => {
  it('uses the default value when the provider is not used', () => {
    render(<ComponentTest />);

    expect(rtlScreen.getByText(new RegExp(bodyPrefix))).toHaveTextContent(
      `${bodyPrefix} full`
    );
  });

  it('provides the given tracking value to its children', () => {
    const tracking: AckeeTrackerValue = 'partial';

    render(
      <AckeeProvider
        domainId="some-id"
        server="https://example.com"
        storageKey="facilis"
        tracking={tracking}
      >
        <ComponentTest />
      </AckeeProvider>
    );

    expect(rtlScreen.getByText(new RegExp(bodyPrefix))).toHaveTextContent(
      `${bodyPrefix} ${tracking}`
    );
  });
});
