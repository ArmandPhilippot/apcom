import { ExpandableWidget, List } from '@components/WidgetParts';
import { t } from '@lingui/macro';
import { ThematicPreview } from '@ts/types/taxonomies';
import Link from 'next/link';

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
    <ExpandableWidget
      title={thematics.length > 1 ? t`Related thematics` : t`Related thematic`}
      withBorders={true}
    >
      <List items={thematicsList} />
    </ExpandableWidget>
  );
};

export default RelatedThematics;
