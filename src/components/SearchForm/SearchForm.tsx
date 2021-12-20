import { ButtonSubmit } from '@components/Buttons';
import { Form, Input } from '@components/Form';
import { t } from '@lingui/macro';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';

const SearchForm = ({ isOpened }: { isOpened: boolean }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 800);
  }, [isOpened]);

  const launchSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push({ pathname: '/recherche', query: { s: query } });
    setQuery('');
  };

  return (
    <Form submitHandler={launchSearch} modifier="search">
      <Input
        ref={inputRef}
        id="search-query"
        name="search-query"
        type="search"
        value={query}
        setValue={setQuery}
      />
      <ButtonSubmit>{t`Search`}</ButtonSubmit>
    </Form>
  );
};

export default SearchForm;
