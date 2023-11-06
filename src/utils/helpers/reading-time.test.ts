import { describe, it } from '@jest/globals';
import { getReadingTimeFrom } from './reading-time';

describe('reading-time', () => {
  it('can transform a words count into a reading time in minutes', () => {
    const wordsCount = 250;

    // With the default settings, 250 words should be rounded to one minute.
    expect(getReadingTimeFrom(wordsCount).inMinutes()).toBe(1);
  });

  it('can transform a words count into a reading time in minutes and seconds', () => {
    const wordsCount = 1200;
    const readingTime = getReadingTimeFrom(wordsCount).inMinutesAndSeconds();

    expect(readingTime.minutes).toBeGreaterThan(1);
    expect(readingTime.seconds).toBeGreaterThan(0);
  });

  it('can use a custom words per minute setting', () => {
    const wordsCount = 100;
    const wordsPerMinute = 100;
    const readingTime = getReadingTimeFrom(
      wordsCount,
      wordsPerMinute
    ).inMinutesAndSeconds();

    expect(readingTime.minutes).toBe(1);
    expect(readingTime.seconds).toBe(0);
  });
});
