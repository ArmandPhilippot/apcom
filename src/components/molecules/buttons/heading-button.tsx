import { FC, SetStateAction } from 'react';
import { useIntl } from 'react-intl';
import { Heading, type HeadingProps, PlusMinus } from '../../atoms';
import styles from './heading-button.module.scss';

export type HeadingButtonProps = Pick<HeadingProps, 'level'> & {
  /**
   * Set additional classnames to the button.
   */
  className?: string;
  /**
   * Accordion state.
   */
  expanded: boolean;
  /**
   * Callback function to set accordion state on click.
   */
  setExpanded: (value: SetStateAction<boolean>) => void;
  /**
   * Accordion title.
   */
  title: string;
};

/**
 * HeadingButton component
 *
 * Render a button as accordion title to toggle body.
 */
export const HeadingButton: FC<HeadingButtonProps> = ({
  className = '',
  expanded,
  level,
  setExpanded,
  title,
}) => {
  const intl = useIntl();
  const iconState = expanded ? 'minus' : 'plus';
  const titlePrefix = expanded
    ? intl.formatMessage({
        defaultMessage: 'Collapse',
        description: 'HeadingButton: title prefix (expanded state)',
        id: 'UX9Bu8',
      })
    : intl.formatMessage({
        defaultMessage: 'Expand',
        description: 'HeadingButton: title prefix (collapsed state)',
        id: 'bcyOgC',
      });

  return (
    <button
      className={`${styles.wrapper} ${className}`}
      onClick={() => setExpanded(!expanded)}
      type="button"
    >
      <Heading level={level} withMargin={false} className={styles.heading}>
        <span className="screen-reader-text">{titlePrefix} </span>
        {title}
      </Heading>
      <PlusMinus state={iconState} className={styles.icon} />
    </button>
  );
};
