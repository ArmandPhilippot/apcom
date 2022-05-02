import Heading from '@components/atoms/headings/heading';
import styles from './page-header.module.scss';
import Meta, { type MetaMap } from './meta';
import { FC } from 'react';

export type PageHeaderProps = {
  /**
   * Set additional classnames to the header element.
   */
  className?: string;
  /**
   * The page introduction.
   */
  intro?: string | JSX.Element;
  /**
   * The page metadata.
   */
  meta?: MetaMap;
  /**
   * The page title.
   */
  title: string;
};

/**
 * PageHeader component
 *
 * Render a header element with page title, meta and intro.
 */
const PageHeader: FC<PageHeaderProps> = ({
  className = '',
  intro,
  meta,
  title,
}) => {
  return (
    <header className={`${styles.wrapper} ${className}`}>
      <div className={styles.body}>
        <Heading level={1} className={styles.title} withMargin={false}>
          {title}
        </Heading>
        {meta && <Meta data={meta} className={styles.meta} layout="inline" />}
        {intro && <div>{intro}</div>}
      </div>
    </header>
  );
};

export default PageHeader;
