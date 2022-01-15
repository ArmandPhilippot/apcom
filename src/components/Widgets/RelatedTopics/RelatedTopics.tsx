import { ExpandableWidget, List } from '@components/WidgetParts';
import { t } from '@lingui/macro';
import { SubjectPreview } from '@ts/types/taxonomies';
import Link from 'next/link';

const RelatedTopics = ({ topics }: { topics: SubjectPreview[] }) => {
  const sortedSubjects = [...topics].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const subjects = sortedSubjects.map((subject) => {
    return (
      <li key={subject.databaseId}>
        <Link href={`/sujet/${subject.slug}`}>
          <a>{subject.title}</a>
        </Link>
      </li>
    );
  });

  return (
    <ExpandableWidget
      title={topics.length > 1 ? t`Related topics` : t`Related topic`}
      withBorders={true}
    >
      <List items={subjects} />
    </ExpandableWidget>
  );
};

export default RelatedTopics;
