import { useRouter } from 'next/router';
import {
  type FC,
  type ReactNode,
  createContext,
  type Dispatch,
  type SetStateAction,
  useMemo,
} from 'react';
import { useAckee } from 'use-ackee';
import type { AckeeTrackerValue } from '../../../types';
import { useLocalStorage } from '../../hooks';

type AckeeContextProps = {
  tracking: AckeeTrackerValue;
  setTracking: Dispatch<SetStateAction<AckeeTrackerValue>>;
};

export const AckeeContext = createContext<AckeeContextProps>({
  setTracking: (value) => value,
  tracking: 'full',
});

const validator = (value: unknown): value is AckeeTrackerValue =>
  value === 'full' || value === 'partial';

export type AckeeProviderProps = {
  /**
   * The provider children.
   */
  children?: ReactNode;
  /**
   *  The id given by Ackee for this domain.
   */
  domainId: string;
  /**
   * Should we track visits from localhost?
   *
   * @default false
   */
  isLocalhostTracked?: boolean;
  /**
   * Should we track our own visits?
   *
   * @default false
   */
  isOwnVisitsTracked?: boolean;
  /**
   * An URL that points to your Ackee installation (without trailing slash).
   */
  server: string;
  /**
   * The key to use in local storage.
   */
  storageKey: string;
  /**
   * Should the tracking be detailed (full) or not (partial)?
   */
  tracking: AckeeTrackerValue;
};

export const AckeeProvider: FC<AckeeProviderProps> = ({
  children,
  domainId,
  isLocalhostTracked = false,
  isOwnVisitsTracked = false,
  server,
  storageKey,
  tracking: tracker,
}) => {
  const [tracking, setTracking] = useLocalStorage<AckeeTrackerValue>(
    storageKey,
    tracker,
    validator
  );
  const { asPath } = useRouter();

  useAckee(
    asPath,
    { domainId, server },
    {
      detailed: tracking === 'full',
      ignoreLocalhost: !isLocalhostTracked,
      ignoreOwnVisits: !isOwnVisitsTracked,
    }
  );

  const value = useMemo(() => {
    return { setTracking, tracking };
  }, [setTracking, tracking]);

  return (
    <AckeeContext.Provider value={value}>{children}</AckeeContext.Provider>
  );
};
