import {
  forwardRef,
  type ForwardRefRenderFunction,
  useId,
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
} from 'react';
import { useIntl } from 'react-intl';
import { type FormSubmitHandler, useForm } from '../../../../utils/hooks';
import { Button, Form, Icon, Input, Label, Notice } from '../../../atoms';
import { LabelledField } from '../../../molecules';
import styles from './search-form.module.scss';

export type SearchFormData = { query: string };

export type SearchFormSubmit = FormSubmitHandler<SearchFormData>;

export type SearchFormProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onSubmit'
> & {
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
> = ({ isLabelHidden = false, onSubmit, ...props }, ref) => {
  const intl = useIntl();
  const { messages, submit, submitStatus, update, values } =
    useForm<SearchFormData>({
      initialValues: { query: '' },
      submitHandler: onSubmit,
    });
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const formClass = `${styles.form} ${
    styles[isLabelHidden ? 'form--no-label' : 'form--has-label']
  }`;
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
    <div {...props}>
      <Form className={formClass} onSubmit={submit}>
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
      {messages?.error && submitStatus === 'FAILED' ? (
        <Notice
          className={styles.notice}
          // eslint-disable-next-line react/jsx-no-literals
          kind="error"
        >
          {messages.error}
        </Notice>
      ) : null}
    </div>
  );
};

/**
 * SearchForm component
 *
 * Render a search form.
 */
export const SearchForm = forwardRef(SearchFormWithRef);
