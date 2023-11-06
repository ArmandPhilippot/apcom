export type GetReadingTimeReturn = {
  /**
   * The reading time rounded to minutes.
   */
  inMinutes: () => number;
  /**
   * The reading time in minutes and seconds.
   */
  inMinutesAndSeconds: () => {
    minutes: number;
    seconds: number;
  };
};

/**
 * Retrieve the reading time from a words count.
 *
 * @param {number} wordsCount - The number of words.
 * @param {number} [wordsPerMinute] - How many words can we read per minute?
 * @returns {GetReadingTimeReturn} Two methods to retrieve the reading time.
 */
export const getReadingTimeFrom = (
  wordsCount: number,
  wordsPerMinute = 245
): GetReadingTimeReturn => {
  const ONE_MINUTE_IN_SECONDS = 60;
  const wordsPerSecond = wordsPerMinute / ONE_MINUTE_IN_SECONDS;
  const estimatedTimeInSeconds = wordsCount / wordsPerSecond;

  return {
    inMinutes: () => Math.round(estimatedTimeInSeconds / ONE_MINUTE_IN_SECONDS),
    inMinutesAndSeconds: () => {
      const estimatedTimeInMinutes = Math.floor(
        estimatedTimeInSeconds / ONE_MINUTE_IN_SECONDS
      );

      return {
        minutes: estimatedTimeInMinutes,
        seconds: Math.round(
          estimatedTimeInSeconds -
            estimatedTimeInMinutes * ONE_MINUTE_IN_SECONDS
        ),
      };
    },
  };
};
