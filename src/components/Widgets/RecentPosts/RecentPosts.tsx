import Spinner from '@components/Spinner/Spinner';
import { config } from '@config/website';
import { t } from '@lingui/macro';
import { getPublishedPosts } from '@services/graphql/queries';
import { ArticlePreview } from '@ts/types/articles';
import { getFormattedDate } from '@utils/helpers/format';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import styles from './RecentPosts.module.scss';

const RecentPosts = () => {
  const { data, error } = useSWR('/recent-posts', () =>
    getPublishedPosts({ first: 3 })
  );
  const router = useRouter();
  const locale = router.locale ? router.locale : config.locales.defaultLocale;

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
                <dt>{t`Published on:`}</dt>
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
    if (error) return t`Failed to load.`;
    if (!data) return <Spinner />;

    return data.posts.map((post) => getPost(post));
  };

  return <ul className={styles.list}>{getPostsItems()}</ul>;
};

export default RecentPosts;
