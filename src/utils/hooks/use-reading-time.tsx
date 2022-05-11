import { useIntl } from 'react-intl';

/**
 * Retrieve the estimated reading time by words count.
 *
 * @param {number} wordsCount - The number of words.
 * @returns {string} The estimated reading time.
 */
const useReadingTime = (
  wordsCount: number,
  onlyMinutes: boolean = false
): string => {
  const intl = useIntl();
  const wordsPerMinute = 245;
  const wordsPerSecond = wordsPerMinute / 60;
  const estimatedTimeInSeconds = wordsCount / wordsPerSecond;

  if (onlyMinutes) {
    const estimatedTimeInMinutes = Math.round(estimatedTimeInSeconds / 60);

    return intl.formatMessage(
      {
        defaultMessage: '{minutesCount} minutes',
        description: 'useReadingTime: rounded minutes count',
        id: 's1i43J',
      },
      { minutesCount: estimatedTimeInMinutes }
    );
  } else {
    const estimatedTimeInMinutes = Math.floor(estimatedTimeInSeconds / 60);

    if (estimatedTimeInMinutes <= 0) {
      return intl.formatMessage(
        {
          defaultMessage: '{count} seconds',
          description: 'useReadingTime: seconds count',
          id: 'i7Wq3G',
        },
        { count: estimatedTimeInSeconds.toFixed(0) }
      );
    }

    const remainingSeconds = Math.round(
      estimatedTimeInSeconds - estimatedTimeInMinutes * 60
    ).toFixed(0);

    return intl.formatMessage(
      {
        defaultMessage: '{minutesCount} minutes {secondsCount} seconds',
        description: 'useReadingTime: minutes + seconds count',
        id: 'OevMeU',
      },
      { minutesCount: estimatedTimeInMinutes, secondsCount: remainingSeconds }
    );
  }
};

export default useReadingTime;
