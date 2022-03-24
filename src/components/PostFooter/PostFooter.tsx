import { ButtonLink } from '@components/Buttons';
import { TopicPreview } from '@ts/types/taxonomies';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import styles from './PostFooter.module.scss';

const PostFooter = ({ topics }: { topics: TopicPreview[] }) => {
  const intl = useIntl();

  const getTopics = () => {
    return topics.map((topic) => {
      return (
        <li className={styles.item} key={topic.id}>
          <ButtonLink target={`/sujet/${topic.slug}`}>
            {topic.featuredImage && (
              <Image
                src={topic.featuredImage.sourceUrl}
                alt={topic.featuredImage.altText}
                layout="intrinsic"
                width="20"
                height="20"
              />
            )}
            {topic.title}
          </ButtonLink>
        </li>
      );
    });
  };

  return (
    <footer>
      {topics.length > 0 && (
        <>
          <dl className={styles.meta}>
            <dt>
              {intl.formatMessage({
                defaultMessage: 'Read more articles about:',
                description: 'PostFooter: read more posts about given subjects',
                id: 'YEudoh',
              })}
            </dt>
            <dd>
              <ul className={styles.list}>{getTopics()}</ul>
            </dd>
          </dl>
        </>
      )}
    </footer>
  );
};

export default PostFooter;
