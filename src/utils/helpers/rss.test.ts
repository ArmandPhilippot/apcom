import { describe, expect, it } from '@jest/globals';
import { CONFIG } from '../config';
import { ROUTES } from '../constants';
import { generateFeed } from './rss';

describe('generate-feed', () => {
  /* eslint-disable max-statements */
  it('generates a rss feed', async () => {
    const feed = await generateFeed();

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(10);

    expect(feed.options.author).toStrictEqual({
      name: CONFIG.name,
      email: process.env.APP_AUTHOR_EMAIL,
      link: CONFIG.url,
    });
    expect(feed.options.copyright).toBe(
      `\u00A9 ${CONFIG.copyright.startYear} - ${CONFIG.copyright.endYear} ${CONFIG.name} - CC BY SA`
    );
    expect(feed.options.description).toBe(process.env.APP_FEED_DESCRIPTION);
    expect(feed.options.favicon).toBe(`${CONFIG.url}/favicon.ico`);
    expect(feed.options.feedLinks).toStrictEqual({
      json: `${CONFIG.url}${ROUTES.RSS}.json`,
      atom: `${CONFIG.url}${ROUTES.RSS}/atom`,
    });
    expect(feed.options.generator).toBe('Feed & NextJS');
    expect(feed.options.language).toBe(CONFIG.locales.defaultLocale);
    expect(feed.options.link).toBe(CONFIG.url);
    expect(feed.options.title).toBe(`${CONFIG.name} | ${CONFIG.baseline}`);
    expect(feed.items.length).toBeGreaterThan(0);
  });
  /* eslint-enable max-statements */
});
