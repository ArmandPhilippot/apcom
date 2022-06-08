import useOnClickOutside from '@utils/hooks/use-on-click-outside';
import {
  cloneElement,
  FC,
  ReactComponentElement,
  ReactNode,
  useRef,
  useState,
} from 'react';
import HelpButton from '../buttons/help-button';
import Tooltip from '../modals/tooltip';
import styles from './fieldset.module.scss';

export type FieldsetProps = {
  /**
   * Set additional classnames to the body wrapper.
   */
  bodyClassName?: string;
  /**
   * Set additional classnames to the help button.
   */
  buttonClassName?: string;
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
   * The legend position.
   *
   * @default 'stacked'
   */
  legendPosition?: 'inline' | 'stacked';
  /**
   * An accessible role.
   *
   * @default 'group'
   */
  role?: 'group' | 'radiogroup' | 'presentation' | 'none';
  /**
   * An optional tooltip component.
   */
  Tooltip?: ReactComponentElement<typeof Tooltip>;
};

/**
 * Fieldset component
 *
 * Render a fieldset with a legend.
 */
const Fieldset: FC<FieldsetProps> = ({
  bodyClassName = '',
  buttonClassName = '',
  children,
  className = '',
  legend,
  legendClassName = '',
  legendPosition = 'stacked',
  Tooltip: TooltipComponent,
  ...props
}) => {
  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperModifier = `wrapper--${legendPosition}`;
  const buttonModifier = isTooltipOpened ? styles['btn--activated'] : '';
  const legendModifier =
    TooltipComponent === undefined ? '' : 'legend--has-tooltip';
  const tooltipModifier = isTooltipOpened
    ? 'tooltip--visible'
    : 'tooltip--hidden';

  /**
   * Close the tooltip if the target is not the button.
   *
   * @param {Node} target - The event target.
   */
  const closeTooltip = (target: Node) => {
    if (buttonRef.current && !buttonRef.current.contains(target)) {
      setIsTooltipOpened(false);
    }
  };

  const tooltipRef = useOnClickOutside<HTMLDivElement>(closeTooltip);

  return (
    <fieldset
      className={`${styles.wrapper} ${styles[wrapperModifier]} ${className}`}
      {...props}
    >
      <legend
        className={`${styles.legend} ${styles[legendModifier]} ${legendClassName}`}
      >
        {legend}
      </legend>
      {TooltipComponent && (
        <>
          <HelpButton
            aria-pressed={isTooltipOpened}
            className={`${styles.btn} ${buttonModifier} ${buttonClassName}`}
            onClick={() => setIsTooltipOpened(!isTooltipOpened)}
            ref={buttonRef}
          />
          {cloneElement(TooltipComponent, {
            cloneClassName: `${styles.tooltip} ${styles[tooltipModifier]}`,
            ref: tooltipRef,
          })}
        </>
      )}
      <div className={`${styles.body} ${bodyClassName}`}>{children}</div>
    </fieldset>
  );
};

export default Fieldset;
