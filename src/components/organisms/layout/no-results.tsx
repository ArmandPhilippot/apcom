import { useRouter } from 'next/router';
import { type FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { ROUTES } from '../../../utils/constants';
import { SearchForm, type SearchFormSubmit } from '../forms';

/**
 * NoResults component
 *
 * Renders a no results text with a search form.
 */
export const NoResults: FC = () => {
  const intl = useIntl();
  const router = useRouter();
  const searchSubmitHandler: SearchFormSubmit = useCallback(
    ({ query }) => {
      if (!query)
        return {
          messages: {
            error: intl.formatMessage({
              defaultMessage: 'Query must be longer than one character.',
              description: 'NoResults: invalid query message',
              id: 'VkfO7t',
            }),
          },
          validator: (value) => value.query.length > 1,
        };

      router.push({ pathname: ROUTES.SEARCH, query: { s: query } });

      return undefined;
    },
    [intl, router]
  );

  return (
    <>
      <p>
        {intl.formatMessage({
          defaultMessage: 'No results found.',
          description: 'NoResults: no results',
          id: '5O2vpy',
        })}
      </p>
      <p>
        {intl.formatMessage({
          defaultMessage: 'Would you like to try a new search?',
          description: 'NoResults: try a new search message',
          id: 'DVBwfu',
        })}
      </p>
      <SearchForm isLabelHidden onSubmit={searchSubmitHandler} />
    </>
  );
};
