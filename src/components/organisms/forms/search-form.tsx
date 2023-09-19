import { useRouter } from 'next/router';
import { forwardRef, ForwardRefRenderFunction, useId, useState } from 'react';
import { useIntl } from 'react-intl';
import Button from '../../atoms/buttons/button';
import Form from '../../atoms/forms/form';
import MagnifyingGlass from '../../atoms/icons/magnifying-glass';
import LabelledField, {
  type LabelledFieldProps,
} from '../../molecules/forms/labelled-field';
import styles from './search-form.module.scss';

export type SearchFormProps = Pick<LabelledFieldProps, 'hideLabel'> & {
  /**
   * The search page url.
   */
  searchPage: string;
};

/**
 * SearchForm component
 *
 * Render a search form.
 */
const SearchForm: ForwardRefRenderFunction<
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
    <Form grouped={false} onSubmit={submitHandler} className={styles.wrapper}>
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
        type="submit"
        kind="neutral"
        shape="initial"
        className={styles.btn}
        aria-label={buttonLabel}
      >
        <MagnifyingGlass className={styles.btn__icon} />
      </Button>
    </Form>
  );
};

export default forwardRef(SearchForm);
