import { describe, expect, it } from '@jest/globals';
import type { WPThematicPreview, WPTopicPreview } from '../../../types';
import { ROUTES } from '../../../utils/constants';
import {
  convertWPThematicPreviewToPageLink,
  convertWPTopicPreviewToPageLink,
} from './convert-taxonomy-to-page-link';

describe('convert-taxonomy-to-page-link', () => {
  it('can convert a WPThematicPreview object to a Thematic object', () => {
    const thematic: WPThematicPreview = {
      databaseId: 42,
      slug: '/the-thematic-slug',
      title: 'et ut alias',
    };
    const result = convertWPThematicPreviewToPageLink(thematic);

    expect(result.id).toBe(thematic.databaseId);
    expect(result.logo).toBeUndefined();
    expect(result.name).toBe(thematic.title);
    expect(result.url).toBe(`${ROUTES.THEMATICS}/${thematic.slug}`);
  });

  it('can convert a WPTopicPreview object to a Topic object', () => {
    const topic: WPTopicPreview = {
      databaseId: 42,
      featuredImage: {
        node: {
          altText: 'dolorem quia possimus',
          mediaDetails: {
            height: 480,
            width: 640,
          },
          sourceUrl: 'https://picsum.photos/640/480',
          title: 'eos',
        },
      },
      slug: '/the-topic-slug',
      title: 'et ut alias',
    };
    const result = convertWPTopicPreviewToPageLink(topic);

    expect(result.id).toBe(topic.databaseId);
    expect(result.logo?.alt).toBe(topic.featuredImage?.node.altText);
    expect(result.logo?.height).toBe(
      topic.featuredImage?.node.mediaDetails.height
    );
    expect(result.logo?.src).toBe(topic.featuredImage?.node.sourceUrl);
    expect(result.logo?.title).toBe(topic.featuredImage?.node.title);
    expect(result.logo?.width).toBe(
      topic.featuredImage?.node.mediaDetails.width
    );
    expect(result.name).toBe(topic.title);
    expect(result.url).toBe(`${ROUTES.TOPICS}/${topic.slug}`);
  });
});
