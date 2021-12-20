import { ButtonSubmit } from '@components/Buttons';
import { Form, Input } from '@components/Form';
import { t } from '@lingui/macro';
import { FormEvent, useEffect, useRef, useState } from 'react';

const SearchForm = ({ isOpened }: { isOpened: boolean }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 800);
  }, [isOpened]);

  const launchSearch = (e: FormEvent) => {
    e.preventDefault();
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
