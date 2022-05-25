import useClickOutside from '@utils/hooks/use-click-outside';
import { FC, useRef, useState } from 'react';
import HelpButton from '../buttons/help-button';
import Tooltip, { type TooltipProps } from '../modals/tooltip';
import LabelledSelect, { type LabelledSelectProps } from './labelled-select';
import styles from './select-with-tooltip.module.scss';

export type SelectWithTooltipProps = Omit<
  LabelledSelectProps,
  'labelPosition'
> &
  Pick<TooltipProps, 'title' | 'content'> & {
    /**
     * Set additional classnames to the select wrapper.
     */
    className?: string;
    /**
     * Set additional classnames to the tooltip wrapper.
     */
    tooltipClassName?: TooltipProps['className'];
  };

/**
 * SelectWithTooltip component
 *
 * Render a select with a button to display a tooltip about options.
 */
const SelectWithTooltip: FC<SelectWithTooltipProps> = ({
  className = '',
  content,
  id,
  title,
  tooltipClassName = '',
  ...props
}) => {
  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonModifier = isTooltipOpened ? styles['btn--activated'] : '';
  const tooltipModifier = isTooltipOpened
    ? styles['tooltip--visible']
    : styles['tooltip--hidden'];

  const closeTooltip = (target: EventTarget) => {
    if (buttonRef.current && !buttonRef.current.contains(target as Node))
      setIsTooltipOpened(false);
  };

  useClickOutside(
    tooltipRef,
    (target) => isTooltipOpened && closeTooltip(target)
  );

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <LabelledSelect
        labelPosition="left"
        id={id}
        labelClassName={styles.label}
        {...props}
      />
      <HelpButton
        className={`${styles.btn} ${buttonModifier}`}
        onClick={() => setIsTooltipOpened(!isTooltipOpened)}
        ref={buttonRef}
      />
      <Tooltip
        title={title}
        content={content}
        icon="?"
        className={`${styles.tooltip} ${tooltipModifier} ${tooltipClassName}`}
        ref={tooltipRef}
      />
    </div>
  );
};

export default SelectWithTooltip;
