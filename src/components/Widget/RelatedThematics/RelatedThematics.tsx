import { t } from '@lingui/macro';
import { ThematicPreview } from '@ts/types/taxonomies';
import Link from 'next/link';
import styles from '../Widget.module.scss';

const RelatedThematics = ({ thematics }: { thematics: ThematicPreview[] }) => {
  const sortedThematics = [...thematics].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const thematicsList = sortedThematics.map((thematic) => {
    return (
      <li key={thematic.databaseId}>
        <Link href={`/thematique/${thematic.slug}`}>
          <a>{thematic.title}</a>
        </Link>
      </li>
    );
  });

  return (
    <div>
      <h2 className={styles.title}>
        {thematics.length > 1 ? t`Related thematics` : t`Related thematic`}
      </h2>
      <ul className={styles.list}>{thematicsList}</ul>
    </div>
  );
};

export default RelatedThematics;
