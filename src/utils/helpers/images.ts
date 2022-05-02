import { Image } from '@ts/types/app';
import { RawCover } from '@ts/types/raw-data';

/**
 * Retrieve an Image object from raw data.
 *
 * @param image - The cover raw data.
 * @returns {Image} - An Image object.
 */
export const getImageFromRawData = (image: RawCover): Image => {
  return {
    alt: image.altText,
    height: image.mediaDetails.height,
    src: image.sourceUrl,
    title: image.title,
    width: image.mediaDetails.width,
  };
};
