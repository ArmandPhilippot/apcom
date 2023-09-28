import { useRouter } from 'next/router';
import {
  type ChangeEvent,
  type FormEvent,
  forwardRef,
  type ForwardRefRenderFunction,
  useId,
  useState,
  useCallback,
} from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, Icon, Input, Label } from '../../../atoms';
import { LabelledField } from '../../../molecules';
import styles from './search-form.module.scss';

export type SearchFormProps = {
  /**
   * Should the label be visually hidden?
   *
   * @default false
   */
  isLabelHidden?: boolean;
  /**
   * The search page url.
   */
  searchPage: string;
};

const SearchFormWithRef: ForwardRefRenderFunction<
  HTMLInputElement,
  SearchFormProps
> = ({ isLabelHidden = false, searchPage }, ref) => {
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

  const submitHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      router.push({ pathname: searchPage, query: { s: value } });
      setValue('');
    },
    [router, searchPage, value]
  );

  const updateForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const id = useId();

  return (
    <Form className={styles.wrapper} onSubmit={submitHandler}>
      <LabelledField
        className={styles.field}
        field={
          <Input
            className={styles.field}
            id={`search-form-${id}`}
            name="search-form"
            onChange={updateForm}
            ref={ref}
            type="search"
            value={value}
          />
        }
        label={
          <Label htmlFor={`search-form-${id}`} isHidden={isLabelHidden}>
            {fieldLabel}
          </Label>
        }
      />
      <Button
        aria-label={buttonLabel}
        className={styles.btn}
        kind="neutral"
        shape="initial"
        type="submit"
      >
        <Icon className={styles.btn__icon} shape="magnifying-glass" />
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
