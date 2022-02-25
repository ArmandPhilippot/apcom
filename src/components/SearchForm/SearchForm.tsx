import { ButtonSubmit } from '@components/Buttons';
import { Field, Form } from '@components/FormElements';
import { SearchIcon } from '@components/Icons';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './SearchForm.module.scss';

const SearchForm = ({ isOpened }: { isOpened: boolean }) => {
  const intl = useIntl();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (isOpened && inputRef.current) {
        inputRef.current.focus();
      }
    }, 400);
  }, [isOpened]);

  const launchSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push({ pathname: '/recherche', query: { s: query } });
    setQuery('');
  };

  return (
    <>
      <div className={styles.title}>
        {intl.formatMessage({
          defaultMessage: 'Search',
          description: 'SearchForm : form title',
        })}
      </div>
      <Form submitHandler={launchSearch} kind="search" id="search">
        <label htmlFor="search-query" className="screen-reader-text">
          {intl.formatMessage({
            defaultMessage: 'Keywords:',
            description: 'SearchForm: search field label',
          })}
        </label>
        <Field
          ref={inputRef}
          id="search-query"
          name="search-query"
          kind="search"
          value={query}
          setValue={setQuery}
          required={true}
        />
        <ButtonSubmit modifier="search">
          <SearchIcon />
          <span className="screen-reader-text">
            {intl.formatMessage({
              defaultMessage: 'Search',
              description: 'SearchForm: search button text',
            })}
          </span>
        </ButtonSubmit>
      </Form>
    </>
  );
};

export default SearchForm;
