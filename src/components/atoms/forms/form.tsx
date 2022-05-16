import { Children, FC, FormEvent, Fragment, ReactNode } from 'react';
import styles from './forms.module.scss';

export type FormProps = {
  /**
   * An accessible name.
   */
  'aria-label'?: string;
  /**
   * One or more ids that refers to the form name.
   */
  'aria-labelledby'?: string;
  /**
   * The form body.
   */
  children: ReactNode;
  /**
   * Set additional classnames to the form wrapper.
   */
  className?: string;
  /**
   * Wrap each items with a div. Default: true.
   */
  grouped?: boolean;
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
const Form: FC<FormProps> = ({
  children,
  grouped = true,
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
        <div key={`item-${index}`} className={styles.item}>
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
    <form onSubmit={handleSubmit} {...props}>
      {getFormItems()}
    </form>
  );
};

export default Form;
