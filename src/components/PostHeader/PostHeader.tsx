import { t } from '@lingui/macro';
import { ArticleAuthor, ArticleDates } from '@ts/types/articles';
import { ThematicPreview } from '@ts/types/taxonomies';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './PostHeader.module.scss';

const PostHeader = ({
  author,
  date,
  intro,
  title,
  thematics,
}: {
  author: ArticleAuthor;
  date: ArticleDates;
  intro: string;
  title: string;
  thematics: ThematicPreview[];
}) => {
  const { locale } = useRouter();

  const getAuthor = () => {
    return author.firstName
      ? `${author.firstName} ${author.lastName}`
      : author.name;
  };

  const getLocaleDate = (date: string) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Date(date).toLocaleDateString(locale, dateOptions);
  };

  const getThematics = () => {
    return thematics.map((thematic) => {
      return (
        <dd key={thematic.id}>
          <Link href={`/thematique/${thematic.slug}`}>
            <a>{thematic.title}</a>
          </Link>
        </dd>
      );
    });
  };

  return (
    <header>
      <h1>{title}</h1>
      <ul className={styles.meta}>
        <li>{t`Written by ${getAuthor()} on ${getLocaleDate(
          date.publication
        )}.`}</li>
        <li>{t`Last update on ${getLocaleDate(date.update)}.`}</li>
        {thematics.length > 0 && (
          <li>
            <dl>
              <dt className={styles.label}>{t`Posted in:`}</dt>
              {getThematics()}
            </dl>
          </li>
        )}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: intro }}></div>
    </header>
  );
};

export default PostHeader;
