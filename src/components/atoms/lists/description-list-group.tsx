import { FC, ReactNode, useId } from 'react';
import styles from './description-list-group.module.scss';

export type ItemLayout = 'inline' | 'inline-values' | 'stacked';

export type DescriptionListGroupProps = {
  /**
   * Set additional classnames to the list item wrapper.
   */
  className?: string;
  /**
   * Set additional classnames to the list item description.
   */
  descriptionClassName?: string;
  /**
   * The item label.
   */
  label: string;
  /**
   * The item layout.
   */
  layout?: ItemLayout;
  /**
   * Set additional classnames to the list item term.
   */
  termClassName?: string;
  /**
   * The item value.
   */
  value: ReactNode | ReactNode[];
  /**
   * If true, use a slash to delimitate multiple values.
   */
  withSeparator?: boolean;
};

/**
 * DescriptionListItem component
 *
 * Render a couple of dt/dd wrapped in a div.
 */
export const DescriptionListGroup: FC<DescriptionListGroupProps> = ({
  className = '',
  descriptionClassName = '',
  label,
  termClassName = '',
  value,
  layout = 'stacked',
  withSeparator = false,
}) => {
  const id = useId();
  const layoutStyles = styles[`wrapper--${layout}`];
  const separatorStyles = withSeparator ? styles['wrapper--has-separator'] : '';
  const itemValues = Array.isArray(value) ? value : [value];
  const groupClass = `${styles.wrapper} ${layoutStyles} ${separatorStyles} ${className}`;

  return (
    <div className={groupClass}>
      <dt className={`${styles.term} ${termClassName}`}>{label}</dt>
      {itemValues.map((currentValue, index) => (
        <dd
          className={`${styles.description} ${descriptionClassName}`}
          key={`${id}-${index}`}
        >
          {currentValue}
        </dd>
      ))}
    </div>
  );
};
