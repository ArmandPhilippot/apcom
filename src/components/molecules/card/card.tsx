import {
  forwardRef,
  type HTMLAttributes,
  type ForwardedRef,
  type ReactNode,
  type ReactElement,
} from 'react';
import { Article, ButtonLink, type ButtonLinkProps } from '../../atoms';
import { CardCoverProvider, CardFooterMetaProvider } from './card-provider';
import styles from './card.module.scss';

type CardBaseProps<T extends string | undefined> = T extends string
  ? Omit<ButtonLinkProps, 'children' | 'isExternal' | 'kind' | 'shape' | 'to'>
  : Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type CardProps<T extends string | undefined> = CardBaseProps<T> & {
  /**
   * The card contents.
   */
  children: ReactNode;
  /**
   * The card cover. You need to add a `<CardHeader />` as children to use it.
   */
  cover?: ReactElement;
  /**
   * Should the contents be centered?
   *
   * @default false
   */
  isCentered?: boolean;
  /**
   * Link the card to another page.
   *
   * @default undefined
   */
  linkTo?: T;
  /**
   * The meta to place in the card footer. You need to add a `<CardFooter />`
   * as children to use it.
   */
  meta?: ReactElement;
  /**
   * The card variant.
   *
   * @default 1
   */
  variant?: 1 | 2;
};

const CardWrapper = <T extends string | undefined>(
  {
    children,
    className = '',
    cover,
    isCentered = false,
    linkTo,
    meta,
    variant = 1,
    ...props
  }: CardProps<T>,
  ref: ForwardedRef<T extends string ? HTMLAnchorElement : HTMLDivElement>
) => {
  const wrapperClass = [
    styles.wrapper,
    styles[isCentered ? 'wrapper--centered' : 'wrapper--not-centered'],
    styles[linkTo ? 'wrapper--is-link' : 'wrapper--is-block'],
    className,
  ].join(' ');
  const cardClass = [
    styles.card,
    styles[cover ? 'card--has-cover' : 'card--no-cover'],
    styles[meta ? 'card--has-footer-meta' : 'card--no-footer-meta'],
    styles[`card--variant-${variant}`],
  ].join(' ');

  return (
    <CardCoverProvider cover={cover}>
      <CardFooterMetaProvider meta={meta}>
        {linkTo ? (
          <ButtonLink
            {...(props as CardBaseProps<typeof linkTo>)}
            className={wrapperClass}
            ref={ref}
            // eslint-disable-next-line react/jsx-no-literals -- Shape allowed
            shape="auto"
            to={linkTo}
          >
            <Article className={cardClass}>{children}</Article>
          </ButtonLink>
        ) : (
          <div
            {...(props as CardBaseProps<undefined>)}
            className={wrapperClass}
            ref={ref as ForwardedRef<HTMLDivElement>}
          >
            <Article className={cardClass}>{children}</Article>
          </div>
        )}
      </CardFooterMetaProvider>
    </CardCoverProvider>
  );
};

/**
 * Card component
 *
 * Render a card with title and some other optional data.
 *
 * TODO: remove `cover` and `meta` props (and adapt CSS) when support for CSS
 * `:has()` pseudo-class will be good enough.
 */
export const Card = forwardRef(CardWrapper);
