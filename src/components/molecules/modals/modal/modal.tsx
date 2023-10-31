import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';
import { Button, Icon } from '../../../atoms';
import styles from './modal.module.scss';

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The modal body.
   */
  children: ReactNode;
  /**
   * The close button label.
   */
  closeBtnLabel?: string;
  /**
   * The modal title.
   */
  heading?: ReactNode;
  /**
   * Define an icon to illustrate the modal.
   */
  icon?: ReactNode;
  /**
   * The modal kind.
   *
   * @default 'primary'
   */
  kind?: 'primary' | 'secondary';
  /**
   * A callback function to handle close button action.
   */
  onClose?: () => void;
};

const ModalWithRef: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  {
    children,
    className = '',
    closeBtnLabel,
    heading,
    icon,
    kind = 'primary',
    onClose,
    ...props
  },
  ref
) => {
  const hasHeader = !!heading || !!icon || !!closeBtnLabel;
  const modalClass = [
    styles.modal,
    styles[hasHeader ? 'modal--has-header' : ''],
    styles[closeBtnLabel ? 'modal--has-btn' : ''],
    styles[`modal--${kind}`],
    className,
  ].join(' ');

  return (
    <div {...props} className={modalClass} ref={ref}>
      {hasHeader ? (
        <div className={styles.header}>
          {icon ? (
            <div aria-hidden className={styles.icon}>
              {icon}
            </div>
          ) : null}
          {heading ? <div className={styles.title}>{heading}</div> : null}
          {closeBtnLabel ? (
            <Button
              aria-label={closeBtnLabel}
              className={styles.btn}
              onClick={onClose}
              // eslint-disable-next-line react/jsx-no-literals
              kind="neutral"
              // eslint-disable-next-line react/jsx-no-literals
              shape="initial"
            >
              <Icon
                aria-hidden
                className={styles.icon}
                // eslint-disable-next-line react/jsx-no-literals
                shape="cross"
                // eslint-disable-next-line react/jsx-no-literals
                size="xs"
              />
            </Button>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
};

/**
 * Modal component
 *
 * Render a modal component.
 */
export const Modal = forwardRef(ModalWithRef);
