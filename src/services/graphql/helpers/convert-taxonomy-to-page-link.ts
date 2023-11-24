import type {
  PageLink,
  WPThematicPreview,
  WPTopicPreview,
} from '../../../types';
import { convertWPImgToImg } from './convert-wp-image-to-img';

export const convertTaxonomyToPageLink = ({
  databaseId,
  slug,
  title,
  ...props
}: WPThematicPreview | WPTopicPreview): PageLink => {
  return {
    id: databaseId,
    logo:
      'featuredImage' in props && props.featuredImage
        ? convertWPImgToImg(props.featuredImage.node)
        : undefined,
    name: title,
    url: slug,
  };
};
