import {
  forwardRef,
  type ForwardRefRenderFunction,
  useId,
  useImperativeHandle,
  useRef,
} from 'react';
import { useIntl } from 'react-intl';
import { type FormSubmitHandler, useForm } from '../../../../utils/hooks';
import {
  Button,
  Form,
  type FormProps,
  Icon,
  Input,
  Label,
} from '../../../atoms';
import { LabelledField } from '../../../molecules';
import styles from './search-form.module.scss';

export type SearchFormData = { query: string };

export type SearchFormSubmit = FormSubmitHandler<SearchFormData>;

export type SearchFormProps = Omit<FormProps, 'children' | 'onSubmit'> & {
  /**
   * Should the label be visually hidden?
   *
   * @default false
   */
  isLabelHidden?: boolean;
  /**
   * A callback function to handle search form submit.
   */
  onSubmit?: SearchFormSubmit;
};

export type SearchFormRef = {
  /**
   * A method to focus the search input.
   */
  focus: () => void;
};

const SearchFormWithRef: ForwardRefRenderFunction<
  SearchFormRef,
  SearchFormProps
> = ({ className = '', isLabelHidden = false, onSubmit, ...props }, ref) => {
  const intl = useIntl();
  const { values, submit, submitStatus, update } = useForm<SearchFormData>({
    initialValues: { query: '' },
    submitHandler: onSubmit,
  });
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const formClass = [
    styles.wrapper,
    styles[isLabelHidden ? 'wrapper--no-label' : 'wrapper--has-label'],
    className,
  ].join(' ');
  const labels = {
    button: intl.formatMessage({
      defaultMessage: 'Search',
      description: 'SearchForm: button accessible name',
      id: 'WMqQrv',
    }),
    field: intl.formatMessage({
      defaultMessage: 'Search for:',
      description: 'SearchForm: field accessible label',
      id: 'X8oujO',
    }),
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current?.focus();
        },
      };
    },
    []
  );

  return (
    <Form {...props} className={formClass} onSubmit={submit}>
      <LabelledField
        className={styles.field}
        field={
          <Input
            className={styles.input}
            id={id}
            // eslint-disable-next-line react/jsx-no-literals
            name="query"
            onChange={update}
            ref={inputRef}
            // eslint-disable-next-line react/jsx-no-literals
            type="search"
            value={values.query}
          />
        }
        label={
          <Label htmlFor={id} isHidden={isLabelHidden}>
            {labels.field}
          </Label>
        }
      />
      <Button
        aria-label={labels.button}
        className={styles.btn}
        isLoading={submitStatus === 'PENDING'}
        // eslint-disable-next-line react/jsx-no-literals
        kind="neutral"
        // eslint-disable-next-line react/jsx-no-literals
        shape="initial"
        type="submit"
      >
        <Icon
          aria-hidden
          className={styles.icon}
          // eslint-disable-next-line react/jsx-no-literals
          shape="magnifying-glass"
          // eslint-disable-next-line react/jsx-no-literals
          size="lg"
        />
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
