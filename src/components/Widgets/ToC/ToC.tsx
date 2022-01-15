import { ExpandableWidget, OrderedList } from '@components/WidgetParts';
import { t } from '@lingui/macro';
import { Heading } from '@ts/types/app';
import useHeadingsTree from '@utils/hooks/useHeadingsTree';

const ToC = () => {
  const headingsTree = useHeadingsTree('article');
  const title = t`Table of contents`;

  const getItems = (headings: Heading[]) => {
    return headings.map((heading) => {
      return (
        <li key={heading.id}>
          <a href={`#${heading.id}`}>{heading.title}</a>
          {heading.children.length > 0 && (
            <OrderedList items={getItems(heading.children)} />
          )}
        </li>
      );
    });
  };

  return (
    <ExpandableWidget title={title} expand={true} withBorders={true}>
      <OrderedList items={getItems(headingsTree)} />
    </ExpandableWidget>
  );
};

export default ToC;
