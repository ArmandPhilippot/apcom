import { act, renderHook } from '@testing-library/react';
import type { FC, ReactNode } from 'react';
import type { AckeeTrackerValue } from '../../../types';
import { AckeeProvider, type AckeeProviderProps } from '../../providers';
import { useAckee } from './use-ackee';

const createWrapper = (
  Wrapper: FC<AckeeProviderProps>,
  config: AckeeProviderProps
) =>
  function CreatedWrapper({ children }: { children: ReactNode }) {
    return <Wrapper {...config}>{children}</Wrapper>;
  };

describe('useAckee', () => {
  it('should return the default value without provider and prevent update', () => {
    const { result } = renderHook(() => useAckee());

    expect(result.current[0]).toBe('full');

    act(() => result.current[1]());

    expect(result.current[0]).toBe('full');
  });

  it('can update the value', () => {
    const defaultValue: AckeeTrackerValue = 'full';

    const { result } = renderHook(() => useAckee(), {
      wrapper: createWrapper(AckeeProvider, {
        domainId: 'some-id',
        server: 'https://example.com',
        storageKey: 'veniam',
        tracking: defaultValue,
      }),
    });

    expect(result.current[0]).toBe(defaultValue);

    act(() => result.current[1]());

    expect(result.current[0]).toBe('partial');
  });
});
