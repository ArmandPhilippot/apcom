import type { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './notice.module.scss';

export type NoticeKind = 'error' | 'info' | 'success' | 'warning';

export type NoticeProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /**
   * The notice body.
   */
  children: ReactNode;
  /**
   * The notice kind.
   */
  kind: NoticeKind;
};

/**
 * Notice component
 *
 * Render a colored message depending on notice kind.
 */
export const Notice: FC<NoticeProps> = ({
  className = '',
  children,
  kind,
  ...props
}) => {
  const kindClass = styles[`notice--${kind}`];
  const noticeClass = `${styles.notice} ${kindClass} ${className}`;

  return (
    <div {...props} className={noticeClass}>
      {children}
    </div>
  );
};
