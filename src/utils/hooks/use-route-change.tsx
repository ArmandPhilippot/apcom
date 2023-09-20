import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRouteChange = (callback: () => void) => {
  const { events } = useRouter();

  useEffect(() => {
    events.on('routeChangeStart', callback);
  }, [events, callback]);
};
