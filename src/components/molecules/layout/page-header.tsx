import { FC, ReactNode } from 'react';
import { Heading } from '../../atoms';
import { Meta, type MetaData } from './meta';
import styles from './page-header.module.scss';

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
  meta?: MetaData;
  /**
   * The page title.
   */
  title: ReactNode;
};

/**
 * PageHeader component
 *
 * Render a header element with page title, meta and intro.
 */
export const PageHeader: FC<PageHeaderProps> = ({
  className = '',
  intro,
  meta,
  title,
}) => {
  const getIntro = () => {
    return typeof intro === 'string' ? (
      <div
        className={styles.intro}
        dangerouslySetInnerHTML={{ __html: intro }}
      />
    ) : (
      <div className={styles.intro}>{intro}</div>
    );
  };

  return (
    <header className={`${styles.wrapper} ${className}`}>
      <div className={styles.body}>
        <Heading level={1} className={styles.title} withMargin={false}>
          {title}
        </Heading>
        {meta && (
          <Meta
            data={meta}
            className={styles.meta}
            layout="column"
            itemsLayout="inline"
          />
        )}
        {intro && getIntro()}
      </div>
    </header>
  );
};
