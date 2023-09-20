import {
  Children,
  FC,
  FormEvent,
  FormHTMLAttributes,
  Fragment,
  ReactNode,
} from 'react';
import styles from './forms.module.scss';

export type FormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  /**
   * The form body.
   */
  children: ReactNode;
  /**
   * Wrap each items with a div. Default: true.
   */
  grouped?: boolean;
  /**
   * If grouped, set additional classnames to the items wrapper.
   */
  itemsClassName?: string;
  /**
   * A callback function to execute on submit.
   */
  onSubmit: () => void;
};

/**
 * Form component.
 *
 * Render children wrapped in a form element.
 */
export const Form: FC<FormProps> = ({
  children,
  grouped = true,
  itemsClassName = '',
  onSubmit,
  ...props
}) => {
  const arrayChildren = Children.toArray(children);

  /**
   * Get the form items.
   * @returns {JSX.Element[]} An array of child elements wrapped in a div.
   */
  const getFormItems = (): JSX.Element[] => {
    return arrayChildren.map((child, index) =>
      grouped ? (
        <div
          key={`item-${index}`}
          className={`${styles.item} ${itemsClassName}`}
        >
          {child}
        </div>
      ) : (
        <Fragment key={`item-${index}`}>{child}</Fragment>
      )
    );
  };

  /**
   * Handle form submit.
   * @param {FormEvent} e - The form event.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form {...props} onSubmit={handleSubmit}>
      {getFormItems()}
    </form>
  );
};
