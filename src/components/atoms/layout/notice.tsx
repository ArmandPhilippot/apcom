import { FC, HTMLAttributes } from 'react';
import styles from './notice.module.scss';

export type NoticeKind = 'error' | 'info' | 'success' | 'warning';

export type NoticeProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /**
   * The notice kind.
   */
  kind: NoticeKind;
  /**
   * The notice body.
   */
  message: string;
};

/**
 * Notice component
 *
 * Render a colored message depending on notice kind.
 */
export const Notice: FC<NoticeProps> = ({
  className = '',
  kind,
  message,
  ...props
}) => {
  const kindClass = `wrapper--${kind}`;
  const noticeClass = `${styles.wrapper} ${styles[kindClass]} ${className}`;

  return (
    <div {...props} className={noticeClass}>
      {message}
    </div>
  );
};
