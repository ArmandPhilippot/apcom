import { FC, ReactNode, useState } from 'react';
import { HeadingButton, type HeadingButtonProps } from '../buttons';
import styles from './widget.module.scss';

export type WidgetProps = Pick<
  HeadingButtonProps,
  'expanded' | 'level' | 'title'
> & {
  /**
   * The widget body.
   */
  children: ReactNode;
  /**
   * Set additional classnames to the widget wrapper.
   */
  className?: string;
  /**
   * Determine if the widget body should have borders. Default: false.
   */
  withBorders?: boolean;
  /**
   * Determine if a vertical scrollbar should be displayed. Default: false.
   */
  withScroll?: boolean;
};

/**
 * Widget component
 *
 * Render an expandable widget.
 */
export const Widget: FC<WidgetProps> = ({
  children,
  className = '',
  expanded = true,
  level,
  title,
  withBorders = false,
  withScroll = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded);
  const stateClass = isExpanded ? 'widget--expanded' : 'widget--collapsed';
  const bordersClass = withBorders
    ? 'widget--has-borders'
    : 'widget--no-borders';
  const scrollClass = withScroll ? 'widget--has-scroll' : 'widget--no-scroll';
  const widgetClass = `${styles.widget} ${styles[bordersClass]} ${styles[stateClass]} ${styles[scrollClass]} ${className}`;

  return (
    <div className={widgetClass}>
      <HeadingButton
        level={level}
        title={title}
        expanded={isExpanded}
        setExpanded={setIsExpanded}
        className={styles.widget__header}
      />
      <div className={styles.widget__body}>{children}</div>
    </div>
  );
};
