import type { FC, ReactNode } from 'react';
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
  intro?: string | ReactNode;
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
  const headerClass = `${styles.wrapper} ${className}`;

  const getIntro = () => {
    if (typeof intro === 'string')
      return (
        <div
          className={styles.intro}
          /* eslint-disable-next-line react/no-danger -- Not safe but intro can
           * contains links or formatting so we need it. */
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      );

    return <div className={styles.intro}>{intro}</div>;
  };

  return (
    <header className={headerClass}>
      <div className={styles.body}>
        <Heading className={styles.title} level={1}>
          {title}
        </Heading>
        {meta ? (
          <Meta
            className={styles.meta}
            data={meta}
            // eslint-disable-next-line react/jsx-no-literals -- Layout allowed
            itemsLayout="inline"
            // eslint-disable-next-line react/jsx-no-literals -- Layout allowed
            layout="column"
          />
        ) : null}
        {intro ? getIntro() : null}
      </div>
    </header>
  );
};
