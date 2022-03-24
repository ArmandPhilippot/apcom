import { ButtonHelp } from '@components/Buttons';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './Tooltip.module.scss';

const Tooltip = ({
  message,
  title,
}: {
  message: string | string[];
  title: string;
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getMessageFromArray = (strings: string[]) => {
    let keyIndex = 0;
    return (
      <ul>
        {strings.map((string) => {
          keyIndex = keyIndex + 1;
          return <li key={`message-${keyIndex}`}>{string}</li>;
        })}
      </ul>
    );
  };

  const buttonTitle = isOpen
    ? intl.formatMessage({
        defaultMessage: 'Close help',
        description: 'Tooltip: button title',
        id: '9kx83j',
      })
    : intl.formatMessage({
        defaultMessage: 'Show help',
        description: 'Tooltip: button title',
        id: 'A5n+C9',
      });

  const wrapperModifier = isOpen ? styles.visible : styles.hidden;

  return (
    <div>
      <ButtonHelp
        showHelp={isOpen}
        setShowHelp={setIsOpen}
        title={buttonTitle}
      />
      <div className={`${styles.wrapper} ${wrapperModifier}`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>
          {Array.isArray(message) ? getMessageFromArray(message) : message}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
