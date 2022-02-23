import { SetStateAction } from 'react';
import { useIntl } from 'react-intl';
import styles from './ButtonHelp.module.scss';

const ButtonHelp = ({
  showHelp,
  setShowHelp,
  title,
}: {
  showHelp: boolean;
  setShowHelp: (value: SetStateAction<boolean>) => void;
  title?: string;
}) => {
  const intl = useIntl();

  const handleClick = () => {
    setShowHelp((prev) => !prev);
  };

  const activeModifier = showHelp ? styles.active : '';

  return (
    <button
      onClick={handleClick}
      title={title}
      className={`${styles.wrapper} ${activeModifier}`}
    >
      <span className={styles.icon} aria-hidden="true">
        ?
      </span>
      <span className="screen-reader-text">
        {intl.formatMessage({
          defaultMessage: 'Help',
          description: 'ButtonHelp: screen reader text',
        })}
      </span>
    </button>
  );
};

export default ButtonHelp;
