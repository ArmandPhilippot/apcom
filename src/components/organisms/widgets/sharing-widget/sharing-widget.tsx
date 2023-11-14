import { type ForwardRefRenderFunction, forwardRef, useCallback } from 'react';
import { useIntl } from 'react-intl';
import {
  List,
  ListItem,
  SharingLink,
  type SharingMedium,
} from '../../../atoms';
import { Collapsible, type CollapsibleProps } from '../../../molecules';

export type SharingData = {
  /**
   * The content excerpt.
   */
  excerpt: string;
  /**
   * The content title.
   */
  title: string;
  /**
   * The content url.
   */
  url: string;
};

const getUrl = (
  medium: Exclude<SharingMedium, 'email'>,
  data: Omit<SharingData, 'excerpt'>
) => {
  const title = encodeURIComponent(data.title);
  const url = encodeURIComponent(data.url);

  switch (medium) {
    case 'diaspora':
      return `https://share.diasporafoundation.org/?title=${title}&url=${url}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?$u=${url}`;
    case 'journal-du-hacker':
      return `https://www.journalduhacker.net/stories/new?title=${title}&url=${url}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    default:
      throw new Error('Unsupported social media.');
  }
};

export type SharingWidgetProps = Omit<
  CollapsibleProps,
  'children' | 'disablePadding' | 'hasBorders'
> & {
  /**
   * The page data to share.
   */
  data: SharingData;
  /**
   * An ordered list of sharing medium to activate.
   */
  media: SharingMedium[];
};

const SharingWidgetWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  SharingWidgetProps
> = ({ data, media, ...props }, ref) => {
  const intl = useIntl();
  const labels: Record<SharingMedium, string> = {
    'journal-du-hacker': intl.formatMessage({
      defaultMessage: 'Share on Journal du Hacker',
      description: 'SharingWidget: Journal du Hacker sharing link',
      id: 'Hclr0a',
    }),
    diaspora: intl.formatMessage({
      defaultMessage: 'Share on Diaspora',
      description: 'SharingWidget: Diaspora sharing link',
      id: '0f7fty',
    }),
    email: intl.formatMessage({
      defaultMessage: 'Share by Email',
      description: 'SharingWidget: Email sharing link',
      id: 'OWygWB',
    }),
    facebook: intl.formatMessage({
      defaultMessage: 'Share on Facebook',
      description: 'SharingWidget: Facebook sharing link',
      id: 'WzYUm5',
    }),
    linkedin: intl.formatMessage({
      defaultMessage: 'Share on LinkedIn',
      description: 'SharingWidget: LinkedIn sharing link',
      id: 'ofQPC+',
    }),
    twitter: intl.formatMessage({
      defaultMessage: 'Share on Twitter',
      description: 'SharingWidget: Twitter sharing link',
      id: 'QdBC6q',
    }),
  };

  /**
   * Build the mailto url from provided data.
   *
   * @returns {string} The mailto url with params.
   */
  const buildEmailUrl = useCallback((): string => {
    const readMore = intl.formatMessage({
      defaultMessage: 'Read more here:',
      description: 'SharingWidget: content link prefix',
      id: 'AsXE0d',
    });
    const excerpt = data.excerpt
      .replace(/<[^>]+>/gi, '')
      .replaceAll('&nbsp;', ' ');
    const body = `${excerpt}\n\n${readMore} ${data.url}`;
    const subject = intl.formatMessage(
      {
        defaultMessage: 'You should read {title}',
        description: 'SharingWidget: subject text',
        id: 'BLq3+e',
      },
      { title: data.title }
    );

    return `mailto:?body=${encodeURIComponent(
      body
    )}&subject=${encodeURIComponent(subject)}`;
  }, [data, intl]);

  return (
    <Collapsible {...props} ref={ref}>
      <List
        hideMarker
        isInline
        // eslint-disable-next-line react/jsx-no-literals
        spacing="xs"
      >
        {media.map((medium) => (
          <ListItem key={medium}>
            <SharingLink
              label={labels[medium]}
              medium={medium}
              url={
                medium === 'email'
                  ? buildEmailUrl()
                  : getUrl(medium, { title: data.title, url: data.url })
              }
            />
          </ListItem>
        ))}
      </List>
    </Collapsible>
  );
};

/**
 * Sharing widget component
 *
 * Render a list of sharing links inside a widget.
 */
export const SharingWidget = forwardRef(SharingWidgetWithRef);
