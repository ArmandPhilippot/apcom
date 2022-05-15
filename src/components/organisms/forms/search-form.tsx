import Button from '@components/atoms/buttons/button';
import Form from '@components/atoms/forms/form';
import MagnifyingGlass from '@components/atoms/icons/magnifying-glass';
import LabelledField, {
  type LabelledFieldProps,
} from '@components/molecules/forms/labelled-field';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useIntl } from 'react-intl';
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
const SearchForm: FC<SearchFormProps> = ({ hideLabel, searchPage }) => {
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

  return (
    <Form grouped={false} onSubmit={submitHandler} className={styles.wrapper}>
      <LabelledField
        type="search"
        id="search-form"
        name="search-form"
        label={fieldLabel}
        value={value}
        setValue={setValue}
        hideLabel={hideLabel}
        className={styles.field}
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

export default SearchForm;
