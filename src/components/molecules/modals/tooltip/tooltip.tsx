import { type FC, type MouseEventHandler, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useOnClickOutside } from '../../../../utils/hooks';
import { Heading, Icon } from '../../../atoms';
import { HelpButton } from '../../buttons';
import { Modal, type ModalProps } from '../modal';
import styles from './tooltip.module.scss';

export type TooltipProps = Omit<ModalProps, 'heading'> & {
  /**
   * The tooltip direction when opening.
   *
   * @default "downwards"
   */
  direction?: 'downwards' | 'upwards';
  /**
   * The tooltip heading.
   */
  heading: string;
  /**
   * Should the tooltip be opened?
   *
   * @default false
   */
  isOpen?: boolean;
  /**
   * A callback function to trigger when clicking outside the modal.
   */
  onClickOutside?: () => void;
  /**
   * An event handler when clicking on the help button.
   */
  onToggle?: MouseEventHandler<HTMLButtonElement>;
};

/**
 * Tooltip component
 *
 * Render a button and a modal. Note: you should add a CSS rule
 * `position: relative;` on the consumer.
 */
export const Tooltip: FC<TooltipProps> = ({
  children,
  className = '',
  direction = 'downwards',
  heading,
  isOpen,
  onClickOutside,
  onToggle,
  ...props
}) => {
  const intl = useIntl();
  const helpLabel = intl.formatMessage({
    defaultMessage: 'Show help',
    description: 'Tooltip: show help label',
    id: '1Xgg7+',
  });
  const directionModifier =
    direction === 'upwards' ? 'tooltip--up' : 'tooltip--down';
  const visibilityModifier = isOpen ? 'tooltip--visible' : 'tooltip--hidden';
  const tooltipClass = `${styles.tooltip} ${styles[directionModifier]} ${styles[visibilityModifier]} ${className}`;
  const btnRef = useRef<HTMLButtonElement>(null);

  const closeModal = (target: Node) => {
    if (!onClickOutside) return;

    if (btnRef.current && !btnRef.current.contains(target)) {
      onClickOutside();
    }
  };

  const modalRef = useOnClickOutside<HTMLDivElement>(closeModal);

  return (
    <>
      <Modal
        {...props}
        className={tooltipClass}
        heading={
          <Heading className={styles.heading} isFake level={6}>
            {heading}
          </Heading>
        }
        icon={<Icon aria-hidden shape="help" size="sm" />}
        kind="secondary"
        ref={modalRef}
      >
        {children}
      </Modal>
      <HelpButton
        className={styles.btn}
        isPressed={isOpen}
        label={helpLabel}
        onClick={onToggle}
        ref={btnRef}
      />
    </>
  );
};
