import { useRouter } from 'next/router';
import { useEffect } from 'react';

export type UseRedirectionConfig = {
  /**
   * Should the url be replaced in the history?
   *
   * @default false
   */
  isReplacing?: boolean;
  /**
   * The destination.
   */
  to: string;
  /**
   * Redirect only when the current path matches the condition.
   *
   * @param {string} path - The current slug.
   * @returns {boolean} True if the path matches.
   */
  whenPathMatches?: (path: string) => boolean;
};

export const useRedirection = ({
  isReplacing = false,
  to,
  whenPathMatches,
}: UseRedirectionConfig) => {
  const router = useRouter();

  useEffect(() => {
    const shouldRedirect = whenPathMatches
      ? whenPathMatches(router.asPath)
      : true;

    if (shouldRedirect) {
      if (isReplacing) router.replace(to, undefined, { shallow: true });
      else router.push(to);
    }
  }, [isReplacing, router, to, whenPathMatches]);
};
