import { ButtonLink } from '@components/Buttons';
import { t } from '@lingui/macro';
import { SubjectPreview } from '@ts/types/taxonomies';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PostFooter.module.scss';

const PostFooter = ({ subjects }: { subjects: SubjectPreview[] }) => {
  const getSubjects = () => {
    return subjects.map((subject) => {
      return (
        <li className={styles.item} key={subject.id}>
          <ButtonLink target={`/sujet/${subject.slug}`}>
            {subject.featuredImage && (
              <Image
                src={subject.featuredImage.sourceUrl}
                alt={subject.featuredImage.altText}
                layout="intrinsic"
                width="20"
                height="20"
              />
            )}
            {subject.title}
          </ButtonLink>
        </li>
      );
    });
  };

  return (
    <footer>
      {subjects.length > 0 && (
        <>
          <dl className={styles.meta}>
            <dt>{t`Read more articles about:`}</dt>
            <dd>
              <ul className={styles.list}>{getSubjects()}</ul>
            </dd>
          </dl>
        </>
      )}
    </footer>
  );
};

export default PostFooter;
