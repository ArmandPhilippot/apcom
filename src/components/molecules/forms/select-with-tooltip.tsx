import Select, { SelectProps } from '@components/atoms/forms/select';
import { FC, useState } from 'react';
import HelpButton from '../buttons/help-button';
import Tooltip, { TooltipProps } from '../modals/tooltip';
import styles from './select-with-tooltip.module.scss';

export type SelectWithTooltipProps = SelectProps &
  Pick<TooltipProps, 'title' | 'content'> & {
    /**
     * The select label.
     */
    label: string;
    /**
     * Set additional classes to the tooltip wrapper.
     */
    tooltipClasses?: string;
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
  label,
  tooltipClasses = '',
  ...props
}) => {
  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false);
  const buttonModifier = isTooltipOpened ? styles['btn--activated'] : '';
  const tooltipModifier = isTooltipOpened
    ? styles['tooltip--visible']
    : styles['tooltip--hidden'];

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <Select id={id} {...props} classes={styles.select} />
      <HelpButton
        onClick={() => setIsTooltipOpened(!isTooltipOpened)}
        classes={buttonModifier}
      />
      <Tooltip
        title={title}
        content={content}
        icon="?"
        classes={`${styles.tooltip} ${tooltipModifier} ${tooltipClasses}`}
      />
    </div>
  );
};

export default SelectWithTooltip;
