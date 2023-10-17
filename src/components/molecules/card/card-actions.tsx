import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  forwardRef,
  type ReactNode,
} from 'react';
import styles from './card.module.scss';

export type CardActionsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /**
   * The actions alignment.
   *
   * @default 'end'
   */
  alignment?: 'center' | 'end' | 'start';
  /**
   * The card actions (ie. buttons, links...).
   */
  children: ReactNode;
};

const CardActionsWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  CardActionsProps
> = ({ alignment = 'end', children, className = '', style, ...props }, ref) => {
  const actionsClass = `${styles.actions} ${className}`;
  const actionsStyles = {
    ...style,
    '--alignment': alignment === 'center' ? alignment : `flex-${alignment}`,
  };

  return (
    <div {...props} className={actionsClass} ref={ref} style={actionsStyles}>
      {children}
    </div>
  );
};

export const CardActions = forwardRef(CardActionsWithRef);
