import {
  type ForwardedRef,
  forwardRef,
  type TextareaHTMLAttributes,
} from 'react';
import styles from '../fields.module.scss';

type AllowedTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'disabled' | 'readOnly' | 'required'
> &
  Required<Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'name'>>;

export type TextAreaProps = AllowedTextAreaProps & {
  /**
   * Should the field be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Should the field be hidden?
   *
   * @default false
   */
  isHidden?: boolean;
  /**
   * Should the field be readonly?
   *
   * @default false
   */
  isReadOnly?: boolean;
  /**
   * Should the field be required?
   *
   * @default false
   */
  isRequired?: boolean;
};

const TextAreaWithRef = (
  {
    className = '',
    isDisabled = false,
    isHidden = false,
    isReadOnly = false,
    isRequired = false,
    ...props
  }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const fieldClassName = `${styles.field} ${styles['field--textarea']} ${className}`;

  return (
    <textarea
      {...props}
      className={fieldClassName}
      disabled={isDisabled}
      readOnly={isReadOnly}
      ref={ref}
      required={isRequired}
    />
  );
};

/**
 * TextArea component.
 */
export const TextArea = forwardRef(TextAreaWithRef);
