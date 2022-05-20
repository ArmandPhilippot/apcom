import { useRouter } from 'next/router';
import { useEffect } from 'react';

export type RouterQuery = {
  param: string;
  value: string;
};

export type UseRedirectionProps = {
  /**
   * The router query.
   */
  query: RouterQuery;
  /**
   * The redirection url.
   */
  redirectTo: string;
};

/**
 * Redirect to another url when router query match the given parameters.
 *
 * @param {UseRedirectionProps} props - The redirection parameters.
 */
const useRedirection = ({ query, redirectTo }: UseRedirectionProps) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query[query.param] === query.value) router.push(redirectTo);
  }, [query, redirectTo, router]);
};

export default useRedirection;
