import { useRouter } from 'next/router';
import { createContext, FC, useContext, useState } from 'react';
import useAckee from 'use-ackee';

export type AckeeProps = {
  domain: string;
  siteId: string;
  detailed?: boolean;
  setDetailed: (isDetailed: boolean) => void;
};

export type AckeeProviderProps = {
  domain: string;
  siteId: string;
  ignoreLocalhost?: boolean;
  ignoreOwnVisits?: boolean;
};

export const AckeeContext = createContext<AckeeProps>({
  domain: '',
  siteId: '',
  setDetailed: (_) => {
    // Do nothing.
  },
});

export const useAckeeTracker = () => useContext(AckeeContext);

export const AckeeProvider: FC<AckeeProviderProps> = ({
  domain,
  siteId,
  children,
  ignoreLocalhost = true,
  ignoreOwnVisits = true,
}) => {
  const [detailed, setDetailed] = useState<boolean>(false);
  const { asPath } = useRouter();

  useAckee(
    asPath,
    { server: domain, domainId: siteId },
    { detailed, ignoreLocalhost, ignoreOwnVisits }
  );

  return (
    <AckeeContext.Provider
      value={{
        domain,
        siteId,
        detailed,
        setDetailed,
      }}
    >
      {children}
    </AckeeContext.Provider>
  );
};
