import Spinner from '@components/Spinner/Spinner';
import { getPublishedPosts } from '@services/graphql/queries';
import { ArticlePreview } from '@ts/types/articles';
import { PostsList } from '@ts/types/blog';
import { settings } from '@utils/config';
import { getFormattedDate } from '@utils/helpers/format';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useSWR from 'swr';
import styles from './RecentPosts.module.scss';

const RecentPosts = ({ posts }: { posts: PostsList }) => {
  const intl = useIntl();
  const { data, error } = useSWR<PostsList>(
    '/recent-posts',
    () => getPublishedPosts({ first: 3 }),
    { fallbackData: posts }
  );
  const router = useRouter();
  const locale = router.locale ? router.locale : settings.locales.defaultLocale;

  const getPost = (post: ArticlePreview) => {
    return (
      <li key={post.id} className={styles.item}>
        <Link href={`/article/${post.slug}`}>
          <a className={styles.link}>
            <article className={styles.article}>
              {post.featuredImage &&
                Object.keys(post.featuredImage).length > 0 && (
                  <div className={styles.cover}>
                    <Image
                      src={post.featuredImage.sourceUrl}
                      alt={post.featuredImage.altText}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
              <h3 className={styles.title}>{post.title}</h3>
              <dl className={styles.meta}>
                <dt>
                  {intl.formatMessage({
                    defaultMessage: 'Published on:',
                    description: 'RecentPosts: publication date label',
                    id: '1h+N2z',
                  })}
                </dt>
                <dd>
                  <time dateTime={post.dates.publication}>
                    {getFormattedDate(post.dates.publication, locale)}
                  </time>
                </dd>
              </dl>
            </article>
          </a>
        </Link>
      </li>
    );
  };

  const getPostsItems = () => {
    if (error)
      return intl.formatMessage({
        defaultMessage: 'Failed to load.',
        description: 'RecentPosts: failed to load text',
        id: 'iyEh0R',
      });
    if (!data) return <Spinner />;

    return data.posts.map((post) => getPost(post));
  };

  return <ul className={styles.list}>{getPostsItems()}</ul>;
};

export default RecentPosts;
