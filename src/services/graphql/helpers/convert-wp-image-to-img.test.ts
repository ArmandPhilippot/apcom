import { describe, expect, it } from '@jest/globals';
import type { WPImage } from '../../../types';
import { convertWPImgToImg } from './convert-wp-image-to-img';

describe('convert-wp-image-to-img', () => {
  it('converts a WPImage object to an Img object', () => {
    const img: WPImage = {
      altText: 'molestiae praesentium animi',
      mediaDetails: {
        height: 480,
        width: 640,
      },
      sourceUrl: 'https://picsum.photos/640/480',
      title: null,
    };

    const transformedImg = convertWPImgToImg(img);

    expect(transformedImg.alt).toBe(img.altText);
    expect(transformedImg.height).toBe(img.mediaDetails.height);
    expect(transformedImg.src).toBe(img.sourceUrl);
    expect(transformedImg.title).toBeUndefined();
    expect(transformedImg.width).toBe(img.mediaDetails.width);
  });

  it('can return an empty string if altText is missing', () => {
    const img: WPImage = {
      altText: null,
      mediaDetails: {
        height: 480,
        width: 640,
      },
      sourceUrl: 'https://picsum.photos/640/480',
      title: null,
    };

    const transformedImg = convertWPImgToImg(img);

    expect(transformedImg.alt).toBe('');
  });
});
