import { MetaKind } from '@ts/types/app';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { MetaItem } from '..';

const ReadingTime = ({
  time,
  words,
  kind,
}: {
  time: number;
  words: number;
  kind: MetaKind;
}) => {
  const intl = useIntl();
  const { locale } = useRouter();

  const getEstimation = () => {
    if (time < 0) {
      return intl.formatMessage({
        defaultMessage: 'less than 1 minute',
        description: 'ReadingTime: Reading time value',
        id: 'ySsWZl',
      });
    }

    return intl.formatMessage(
      {
        defaultMessage:
          '{time, plural, =0 {# minutes} one {# minute} other {# minutes}}',
        description: 'ReadingTime: reading time value',
        id: 'wdqOpf',
      },
      { time }
    );
  };

  return (
    <MetaItem
      title={intl.formatMessage({
        defaultMessage: 'Reading time:',
        description: 'ReadingTime: reading time meta label',
        id: 'n0Gbod',
      })}
      value={getEstimation()}
      info={intl.formatMessage(
        {
          defaultMessage: 'Approximately {number} words',
          description: 'ReadingTime: number of words',
          id: 'k7/SkN',
        },
        { number: words.toLocaleString(locale) }
      )}
      kind={kind}
    />
  );
};

export default ReadingTime;
