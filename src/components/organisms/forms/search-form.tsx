import Button from '@components/atoms/buttons/button';
import Form from '@components/atoms/forms/form';
import MagnifyingGlass from '@components/atoms/icons/magnifying-glass';
import LabelledField, {
  LabelledFieldProps,
} from '@components/molecules/forms/labelled-field';
import { useState, VFC } from 'react';
import { useIntl } from 'react-intl';
import styles from './search-form.module.scss';

export type SearchFormProps = Pick<LabelledFieldProps, 'hideLabel'>;

const SearchForm: VFC<SearchFormProps> = ({ hideLabel }) => {
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

  const [value, setValue] = useState<string>('');

  const submitHandler = () => {
    return;
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
