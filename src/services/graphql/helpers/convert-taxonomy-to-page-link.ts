import type {
  PageLink,
  WPThematicPreview,
  WPTopicPreview,
} from '../../../types';
import { ROUTES } from '../../../utils/constants';
import { convertWPImgToImg } from './convert-wp-image-to-img';

const convertTaxonomyToPageLink = ({
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

export const convertWPThematicPreviewToPageLink = (
  thematic: WPThematicPreview
): PageLink =>
  convertTaxonomyToPageLink({
    ...thematic,
    slug: `${ROUTES.THEMATICS}/${thematic.slug}`,
  });

export const convertWPTopicPreviewToPageLink = (
  topic: WPTopicPreview
): PageLink =>
  convertTaxonomyToPageLink({
    ...topic,
    slug: `${ROUTES.TOPICS}/${topic.slug}`,
  });
