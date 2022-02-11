import { ExpandableWidget, OrderedList } from '@components/WidgetParts';
import { Heading } from '@ts/types/app';
import useHeadingsTree from '@utils/hooks/useHeadingsTree';
import { FormattedMessage, useIntl } from 'react-intl';

const ToC = () => {
  const intl = useIntl();
  const headingsTree = useHeadingsTree('article');
  const title = intl.formatMessage({
    defaultMessage: 'Table of contents',
    description: 'ToC: widget title',
  });

  const getItems = (headings: Heading[]) => {
    return headings.map((heading) => {
      return (
        <li key={heading.id}>
          <a href={`#${heading.id}`}>
            <FormattedMessage
              defaultMessage="<a11y>Jump to </a11y>{title}"
              description="ToC: link"
              values={{
                title: heading.title,
                a11y: (chunks: string) => (
                  <span className="screen-reader-text">{chunks}</span>
                ),
              }}
            />
          </a>
          {heading.children.length > 0 && (
            <OrderedList items={getItems(heading.children)} />
          )}
        </li>
      );
    });
  };

  return (
    <ExpandableWidget title={title} kind="toc" expand={true} withBorders={true}>
      <OrderedList items={getItems(headingsTree)} />
    </ExpandableWidget>
  );
};

export default ToC;
