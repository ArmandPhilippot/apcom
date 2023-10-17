import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { MetaList, type MetaListProps } from '../meta-list';
import styles from './card.module.scss';

export type CardMetaProps = MetaListProps;

const CardMetaWithRef: ForwardRefRenderFunction<
  HTMLDListElement,
  CardMetaProps
> = ({ className = '', ...props }, ref) => {
  const metaClass = `${styles.meta} ${className}`;

  return <MetaList {...props} className={metaClass} ref={ref} />;
};

export const CardMeta = forwardRef(CardMetaWithRef);
