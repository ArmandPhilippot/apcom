import { t } from '@lingui/macro';
import { ThematicPreview } from '@ts/types/taxonomies';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './PostMeta.module.scss';

const PostMeta = ({
  commentCount,
  publicationDate,
  updateDate,
  thematics,
}: {
  commentCount: number | null;
  publicationDate: string;
  updateDate: string;
  thematics: ThematicPreview[];
}) => {
  const { locale } = useRouter();
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
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

  const getCommentsCount = () => {
    switch (commentCount) {
      case null:
      case 0:
        return t`No comments`;
      case 1:
        return t`1 comment`;
      default:
        return t`${commentCount} comments`;
    }
  };

  return (
    <dl className={styles.wrapper}>
      <div>
        <dt>{t`Published on`}</dt>
        <dd>
          {new Date(publicationDate).toLocaleDateString(locale, dateOptions)}
        </dd>
      </div>
      {publicationDate !== updateDate && (
        <div>
          <dt>{t`Updated on`}</dt>
          <dd>
            {new Date(updateDate).toLocaleDateString(locale, dateOptions)}
          </dd>
        </div>
      )}
      {thematics.length > 0 && (
        <div>
          <dt>{thematics.length > 1 ? t`Thematics` : t`Thematic`}</dt>
          {getThematics()}
        </div>
      )}
      <div>
        <dt>{t`Comments`}</dt>
        {getCommentsCount()}
      </div>
    </dl>
  );
};

export default PostMeta;
