import { ExpandableWidget, List } from '@components/WidgetParts';
import { TopicPreview } from '@ts/types/taxonomies';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const RelatedTopics = ({ topics }: { topics: TopicPreview[] }) => {
  const intl = useIntl();
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
      title={intl.formatMessage(
        {
          defaultMessage:
            '{topicsCount, plural, =0 {Related topics} one {Related topic} other {Related topics}}',
          description: 'RelatedTopics: widget title',
        },
        { topicsCount: topicsList.length }
      )}
      withBorders={true}
    >
      <List items={topicsList} />
    </ExpandableWidget>
  );
};

export default RelatedTopics;
