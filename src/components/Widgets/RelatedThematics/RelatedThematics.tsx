import { ExpandableWidget, List } from '@components/WidgetParts';
import { ThematicPreview } from '@ts/types/taxonomies';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const RelatedThematics = ({ thematics }: { thematics: ThematicPreview[] }) => {
  const intl = useIntl();
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
      expand={true}
      title={intl.formatMessage(
        {
          defaultMessage:
            '{thematicsCount, plural, =0 {Related thematics} one {Related thematic} other {Related thematics}}',
          description: 'RelatedThematics: widget title',
        },
        { thematicsCount: thematics.length }
      )}
      withBorders={true}
    >
      <List items={thematicsList} />
    </ExpandableWidget>
  );
};

export default RelatedThematics;
