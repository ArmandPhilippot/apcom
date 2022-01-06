import { t } from '@lingui/macro';
import { Heading } from '@ts/types/app';
import { slugify } from '@utils/helpers/slugify';
import useHeadingsTree from '@utils/hooks/useHeadingsTree';
import styles from './ToC.module.scss';

const ToC = () => {
  const headingsTree = useHeadingsTree('article');
  const title = t`Table of contents`;

  const getItems = (headings: Heading[]) => {
    return headings.map((heading) => {
      if (heading.id === slugify(title)) return;

      return (
        <li key={heading.id}>
          <a href={`#${heading.id}`}>{heading.title}</a>
          {heading.children.length > 0 && <ol>{getItems(heading.children)}</ol>}
        </li>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      <ol className={styles.list}>{getItems(headingsTree)}</ol>
    </div>
  );
};

export default ToC;
