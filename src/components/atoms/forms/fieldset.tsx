import { FC, ReactNode } from 'react';
import styles from './fieldset.module.scss';

export type FieldsetProps = {
  /**
   * The fieldset body.
   */
  children: ReactNode | ReactNode[];
  /**
   * Set additional classnames to the fieldset wrapper.
   */
  className?: string;
  /**
   * The fieldset legend.
   */
  legend: string;
  /**
   * Set additional classnames to the legend.
   */
  legendClassName?: string;
  /**
   * The legend position. Default: stacked.
   */
  legendPosition?: 'inline' | 'stacked';
  /**
   * An accessible role. Default: group.
   */
  role?: 'group' | 'radiogroup' | 'presentation' | 'none';
};

/**
 * Fieldset component
 *
 * Render a fieldset with a legend.
 */
const Fieldset: FC<FieldsetProps> = ({
  children,
  className = '',
  legend,
  legendClassName = '',
  legendPosition = 'stacked',
  ...props
}) => {
  const wrapperModifier = `wrapper--${legendPosition}`;

  return (
    <fieldset
      className={`${styles.wrapper} ${styles[wrapperModifier]} ${className}`}
      {...props}
    >
      <legend className={`${styles.legend} ${legendClassName}`}>
        {legend}
      </legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
