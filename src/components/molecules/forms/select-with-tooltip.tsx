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
  title,
  content,
  id,
  tooltipClassName = '',
  ...props
}) => {
  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonModifier = isTooltipOpened ? styles['btn--activated'] : '';
  const tooltipModifier = isTooltipOpened
    ? styles['tooltip--visible']
    : styles['tooltip--hidden'];

  useClickOutside(
    tooltipRef,
    () => isTooltipOpened && setIsTooltipOpened(false)
  );

  return (
    <div className={styles.wrapper}>
      <LabelledSelect
        labelPosition="left"
        id={id}
        labelClassName={styles.label}
        {...props}
      />
      <HelpButton
        onClick={() => setIsTooltipOpened(!isTooltipOpened)}
        className={`${styles.btn} ${buttonModifier}`}
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
