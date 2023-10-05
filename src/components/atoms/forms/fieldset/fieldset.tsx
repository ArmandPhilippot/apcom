import {
  forwardRef,
  type FieldsetHTMLAttributes,
  type ForwardRefRenderFunction,
  type ReactElement,
} from 'react';
import type { LegendProps } from '../legend';
import styles from './fieldset.module.scss';

export type FieldsetProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'disabled' | 'hidden'
> & {
  /**
   * Should the fieldset be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Should the fieldset contents be inlined?
   *
   * @default false
   */
  isInline?: boolean;
  /**
   * The fieldset legend.
   */
  legend?: ReactElement<LegendProps>;
};

/**
 * Fieldset component.
 */
const FieldsetWithRef: ForwardRefRenderFunction<
  HTMLFieldSetElement,
  FieldsetProps
> = (
  {
    children,
    className = '',
    isDisabled = false,
    isInline = false,
    legend,
    ...props
  },
  ref
) => {
  const layoutModifier = isInline
    ? styles['fieldset--inline']
    : styles['fieldset--stack'];
  const legendModifier = legend ? styles['fieldset--has-legend'] : '';
  const fieldsetClass = `${styles.fieldset} ${legendModifier} ${layoutModifier} ${className}`;

  return (
    <fieldset
      {...props}
      className={fieldsetClass}
      disabled={isDisabled}
      ref={ref}
    >
      {legend}
      {children}
    </fieldset>
  );
};

export const Fieldset = forwardRef(FieldsetWithRef);
