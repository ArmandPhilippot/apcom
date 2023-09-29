import type { FC } from 'react';
import { List, ListItem, SocialLink, type SocialLinkProps } from '../../atoms';
import { Widget, type WidgetProps } from '../../molecules';
import styles from './social-media.module.scss';

export type Media = SocialLinkProps;

export type SocialMediaProps = Pick<WidgetProps, 'level' | 'title'> & {
  media: Media[];
};

/**
 * Social Media widget component
 *
 * Render a social media list with links.
 */
export const SocialMedia: FC<SocialMediaProps> = ({ media, ...props }) => {
  /**
   * Retrieve the social media items.
   *
   * @param {SocialMedia[]} links - An array of social media name and url.
   * @returns {JSX.Element[]} The social links.
   */
  const getItems = (links: Media[]): JSX.Element[] =>
    links.map((link, index) => (
      <ListItem key={`media-${index}`}>
        <SocialLink name={link.name} url={link.url} />
      </ListItem>
    ));

  return (
    <Widget expanded={true} {...props}>
      <List className={styles.list} hideMarker isInline spacing="xs">
        {getItems(media)}
      </List>
    </Widget>
  );
};
