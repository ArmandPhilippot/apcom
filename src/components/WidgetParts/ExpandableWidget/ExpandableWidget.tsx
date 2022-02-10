import { TitleLevel } from '@ts/types/app';
import { ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './ExpandableWidget.module.scss';

const ExpandableWidget = ({
  children,
  title,
  titleLevel = 2,
  expand = false,
  withBorders = false,
  kind = 'regular',
}: {
  children: ReactNode;
  title: string;
  titleLevel?: TitleLevel;
  expand?: boolean;
  withBorders?: boolean;
  kind?: 'regular' | 'toc';
}) => {
  const intl = useIntl();
  const [isExpanded, setIsExpanded] = useState<boolean>(expand);

  const handleExpanse = () => setIsExpanded((prev) => !prev);

  const TitleTag = `h${titleLevel}` as keyof JSX.IntrinsicElements;

  const wrapperKindClass = styles[`wrapper--${kind}`];
  const wrapperClasses = `${styles.wrapper} ${
    isExpanded ? styles['wrapper--expanded'] : ''
  } ${wrapperKindClass}`;

  const bodyClasses = `${styles.body} ${
    withBorders ? styles['body--borders'] : ''
  }`;

  return (
    <div className={wrapperClasses}>
      <button type="button" className={styles.header} onClick={handleExpanse}>
        <span className="screen-reader-text">
          {isExpanded
            ? intl.formatMessage({
                defaultMessage: 'Collapse',
                description: 'ExpandableWidget: collapse text',
              })
            : intl.formatMessage({
                defaultMessage: 'Expand',
                description: 'ExpandableWidget: expand text',
              })}
        </span>
        <TitleTag className={styles.title}>{title}</TitleTag>
        <span className={styles.icon} aria-hidden={true}></span>
      </button>
      <div className={bodyClasses}>{children}</div>
    </div>
  );
};

export default ExpandableWidget;
