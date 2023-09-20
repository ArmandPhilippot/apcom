import { useRouter } from 'next/router';
import { forwardRef, ForwardRefRenderFunction, useId, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, MagnifyingGlass } from '../../atoms';
import { LabelledField, type LabelledFieldProps } from '../../molecules';
import styles from './search-form.module.scss';

export type SearchFormProps = Pick<LabelledFieldProps, 'hideLabel'> & {
  /**
   * The search page url.
   */
  searchPage: string;
};

const SearchFormWithRef: ForwardRefRenderFunction<
  HTMLInputElement,
  SearchFormProps
> = ({ hideLabel, searchPage }, ref) => {
  const intl = useIntl();
  const fieldLabel = intl.formatMessage({
    defaultMessage: 'Search for:',
    description: 'SearchForm: field accessible label',
    id: 'X8oujO',
  });
  const buttonLabel = intl.formatMessage({
    defaultMessage: 'Search',
    description: 'SearchForm: button accessible name',
    id: 'WMqQrv',
  });

  const router = useRouter();
  const [value, setValue] = useState<string>('');

  const submitHandler = () => {
    router.push({ pathname: searchPage, query: { s: value } });
    setValue('');
  };

  const id = useId();

  return (
    <Form className={styles.wrapper} grouped={false} onSubmit={submitHandler}>
      <LabelledField
        className={styles.field}
        hideLabel={hideLabel}
        id={`search-form-${id}`}
        label={fieldLabel}
        name="search-form"
        ref={ref}
        setValue={setValue}
        type="search"
        value={value}
      />
      <Button
        aria-label={buttonLabel}
        className={styles.btn}
        kind="neutral"
        shape="initial"
        type="submit"
      >
        <MagnifyingGlass className={styles.btn__icon} />
      </Button>
    </Form>
  );
};

/**
 * SearchForm component
 *
 * Render a search form.
 */
export const SearchForm = forwardRef(SearchFormWithRef);
