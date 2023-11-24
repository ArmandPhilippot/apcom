import type { Img, WPImage } from '../../../types';

export const convertWPImgToImg = ({
  altText,
  mediaDetails,
  sourceUrl,
  title,
}: WPImage): Img => {
  return {
    alt: altText ?? '',
    height: mediaDetails.height,
    src: sourceUrl,
    title: title ?? undefined,
    width: mediaDetails.width,
  };
};
