import {
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  forwardRef,
} from 'react';
import { HeadingProps } from '../headings';
import styles from './modal.module.scss';

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The modal body.
   */
  children: ReactNode;
  /**
   * The modal title.
   */
  heading?: ReactElement<HeadingProps>;
  /**
   * The modal kind.
   *
   * @default 'primary'
   */
  kind?: 'primary' | 'secondary';
};

const ModalWithRef: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  { children, className = '', heading, kind = 'primary', ...props },
  ref
) => {
  const headingModifier = heading ? 'modal--has-title' : '';
  const kindModifier = `modal--${kind}`;
  const modalClass = `${styles.modal} ${styles[headingModifier]} ${styles[kindModifier]} ${className}`;

  return (
    <div {...props} className={modalClass} ref={ref}>
      {heading ? <div className={styles.title}>{heading}</div> : null}
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
