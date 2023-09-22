import { FC, MouseEventHandler, useRef } from 'react';
import { Heading, Modal, ModalProps } from '../../atoms';
import { HelpButton } from '../buttons';
import styles from './tooltip.module.scss';
import { useOnClickOutside } from '../../../utils/hooks';

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
            <span aria-hidden className={styles.icon}>
              ?
            </span>
            {heading}
          </Heading>
        }
        kind="secondary"
        ref={modalRef}
      >
        {children}
      </Modal>
      <HelpButton
        aria-pressed={isOpen}
        className={styles.btn}
        onClick={onToggle}
        ref={btnRef}
      />
    </>
  );
};
