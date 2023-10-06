import {
  useCallback,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useId,
  useState,
} from 'react';
import { Button, Icon } from '../../atoms';
import styles from './collapsible.module.scss';

export type CollapsibleProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /**
   * The collapsible body.
   */
  children: ReactNode;
  /**
   * Should we disable padding around body?
   *
   * @default false
   */
  disablePadding?: boolean;
  /**
   * Should the body be bordered?
   *
   * @default false
   */
  hasBorders?: boolean;
  /**
   * The collapsible heading.
   */
  heading: ReactNode;
  /**
   * Should the component be collapsed or expanded by default?
   *
   * @default false
   */
  isCollapsed?: boolean;
};

const CollapsibleWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  CollapsibleProps
> = (
  {
    children,
    className = '',
    disablePadding = false,
    hasBorders = false,
    heading,
    isCollapsed = false,
    ...props
  },
  ref
) => {
  const bodyId = useId();
  const [isExpanded, setIsExpanded] = useState(!isCollapsed);
  const bodyClassNames = [
    styles.body,
    hasBorders ? styles['body--has-borders'] : '',
    styles[disablePadding ? 'body--no-padding' : 'body--has-padding'],
  ];
  const wrapperClassNames = [
    styles.wrapper,
    styles[isExpanded ? 'wrapper--expanded' : 'wrapper--collapsed'],
    className,
  ];

  const handleState = useCallback(() => {
    setIsExpanded((prevState) => !prevState);
  }, []);

  return (
    <div {...props} className={wrapperClassNames.join(' ')} ref={ref}>
      <Button
        aria-controls={bodyId}
        aria-expanded={isExpanded}
        className={styles.heading}
        // eslint-disable-next-line react/jsx-no-literals -- Kind allowed
        kind="neutral"
        onClick={handleState}
        // eslint-disable-next-line react/jsx-no-literals -- Shape allowed
        shape="initial"
      >
        {heading}
        <Icon
          aria-hidden
          className={styles.icon}
          shape={isExpanded ? 'minus' : 'plus'}
        />
      </Button>
      <div className={bodyClassNames.join(' ')} id={bodyId}>
        {children}
      </div>
    </div>
  );
};

/**
 * Collapsible component.
 *
 * Render a heading associated to a collapsible body.
 */
export const Collapsible = forwardRef(CollapsibleWithRef);
