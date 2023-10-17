import {
  forwardRef,
  type ForwardRefRenderFunction,
  type ReactNode,
} from 'react';
import { Footer, type FooterProps } from '../../atoms';
import { useCardFooterMeta } from './card-provider';
import styles from './card.module.scss';

export type CardFooterProps = Omit<FooterProps, 'children'> & {
  /**
   * The card footer contents.
   */
  children?: ReactNode;
};

const CardFooterWithRef: ForwardRefRenderFunction<
  HTMLElement,
  CardFooterProps
> = ({ children, className = '', ...props }, ref) => {
  const footerClass = `${styles.footer} ${className}`;
  const meta = useCardFooterMeta();

  return (
    <Footer {...props} className={footerClass} ref={ref}>
      {children}
      {meta}
    </Footer>
  );
};

export const CardFooter = forwardRef(CardFooterWithRef);
