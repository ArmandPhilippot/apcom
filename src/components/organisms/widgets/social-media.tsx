import { FC } from 'react';
import { SocialLink, type SocialLinkProps } from '../../atoms';
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
  const getItems = (links: Media[]): JSX.Element[] => {
    return links.map((link, index) => (
      <li key={`media-${index}`}>
        <SocialLink name={link.name} url={link.url} />
      </li>
    ));
  };

  return (
    <Widget expanded={true} {...props}>
      <ul className={styles.list}>{getItems(media)}</ul>
    </Widget>
  );
};
