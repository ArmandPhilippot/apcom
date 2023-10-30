import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../../tests/utils';
import { AckeeProvider } from '../../../../../utils/providers';
import { AckeeToggle } from './ackee-toggle';

describe('AckeeToggle', () => {
  it('renders a radio group of two radio buttons', () => {
    const defaultValue = 'full';

    render(
      <AckeeProvider
        domainId="any-id"
        server="https://example.com"
        storageKey="molestiae"
        tracking={defaultValue}
      >
        <AckeeToggle />
      </AckeeProvider>
    );

    expect(
      rtlScreen.getByRole('radiogroup', {
        name: /Tracking:/i,
      })
    ).toBeInTheDocument();
    expect(rtlScreen.getAllByRole('radio')).toHaveLength(2);
  });
});
