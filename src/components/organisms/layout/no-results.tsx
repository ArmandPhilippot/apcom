import { FC } from 'react';
import { useIntl } from 'react-intl';
import { SearchForm, type SearchFormProps } from '../forms';

export type NoResultsProps = Pick<SearchFormProps, 'searchPage'>;

/**
 * NoResults component
 *
 * Renders a no results text with a search form.
 */
export const NoResults: FC<NoResultsProps> = ({ searchPage }) => {
  const intl = useIntl();

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
      <SearchForm isLabelHidden searchPage={searchPage} />
    </>
  );
};
