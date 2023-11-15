import { useRouter } from 'next/router';
import { useEffect } from 'react';

export type OnRouteChangeStep = 'start' | 'end';

export type OnRouteChangeHandler = () => void;

/**
 * React hook to trigger a callback function on route change.
 *
 * @param {OnRouteChangeHandler} handler - The callback to trigger.
 * @param {OnRouteChangeStep} [step] - The event step.
 */
export const useOnRouteChange = (
  handler: OnRouteChangeHandler,
  step: OnRouteChangeStep = 'start'
) => {
  const router = useRouter();

  useEffect(() => {
    if (step === 'end') {
      router.events.on('routeChangeComplete', handler);

      return () => {
        router.events.off('routeChangeComplete', handler);
      };
    }

    router.events.on('routeChangeStart', handler);

    return () => {
      router.events.off('routeChangeStart', handler);
    };
  }, [handler, router.events, step]);
};
