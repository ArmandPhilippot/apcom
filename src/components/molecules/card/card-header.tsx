import {
  forwardRef,
  type ForwardRefRenderFunction,
  type ReactNode,
} from 'react';
import { Header, type HeaderProps } from '../../atoms';
import { useCardCover } from './card-provider';
import styles from './card.module.scss';

export type CardHeaderProps = Omit<HeaderProps, 'children'> & {
  /**
   * The card header contents.
   */
  children?: ReactNode;
};

const CardHeaderWithRef: ForwardRefRenderFunction<
  HTMLElement,
  CardHeaderProps
> = ({ children, className = '', ...props }, ref) => {
  const cover = useCardCover();
  const headerClass = `${styles.header} ${className}`;

  return (
    <Header {...props} className={headerClass} ref={ref}>
      {cover}
      {children}
    </Header>
  );
};

export const CardHeader = forwardRef(CardHeaderWithRef);
