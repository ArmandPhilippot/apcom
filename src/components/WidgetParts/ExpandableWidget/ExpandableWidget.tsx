import { t } from '@lingui/macro';
import { TitleLevel } from '@ts/types/app';
import { ReactNode, useState } from 'react';
import styles from './ExpandableWidget.module.scss';

const ExpandableWidget = ({
  children,
  title,
  titleLevel = 2,
  expand = false,
  withBorders = false,
}: {
  children: ReactNode;
  title: string;
  titleLevel?: TitleLevel;
  expand?: boolean;
  withBorders?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(expand);

  const handleExpanse = () => setIsExpanded((prev) => !prev);

  const TitleTag = `h${titleLevel}` as keyof JSX.IntrinsicElements;

  const wrapperClasses = `${styles.wrapper} ${
    isExpanded ? styles['wrapper--expanded'] : ''
  }`;

  const bodyClasses = `${styles.body} ${
    withBorders ? styles['body--borders'] : ''
  }`;

  return (
    <div className={wrapperClasses}>
      <button type="button" className={styles.header} onClick={handleExpanse}>
        <span className="screen-reader-text">
          {isExpanded ? t`Collapse` : t`Expand`}
        </span>
        <TitleTag className={styles.title}>{title}</TitleTag>
        <span className={styles.icon} aria-hidden={true}></span>
      </button>
      <div className={bodyClasses}>{children}</div>
    </div>
  );
};

export default ExpandableWidget;
