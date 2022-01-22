import { ExpandableWidget, List } from '@components/WidgetParts';
import { t } from '@lingui/macro';
import { TopicPreview } from '@ts/types/taxonomies';
import Link from 'next/link';

const RelatedTopics = ({ topics }: { topics: TopicPreview[] }) => {
  const sortedTopics = [...topics].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const topicsList = sortedTopics.map((topic) => {
    return (
      <li key={topic.databaseId}>
        <Link href={`/sujet/${topic.slug}`}>
          <a>{topic.title}</a>
        </Link>
      </li>
    );
  });

  return (
    <ExpandableWidget
      title={topicsList.length > 1 ? t`Related topics` : t`Related topic`}
      withBorders={true}
    >
      <List items={topicsList} />
    </ExpandableWidget>
  );
};

export default RelatedTopics;
