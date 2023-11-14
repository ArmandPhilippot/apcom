import { type ForwardRefRenderFunction, forwardRef, useCallback } from 'react';
import { Link, List, ListItem } from '../../../atoms';
import { Collapsible, type CollapsibleProps } from '../../../molecules';
import styles from './links-widget.module.scss';

export type LinksWidgetItemData = {
  /**
   * An array of name/url couple child of this list item.
   */
  child?: LinksWidgetItemData[];
  /**
   * The item id.
   */
  id: string;
  /**
   * The item name.
   */
  label: string;
  /**
   * The item url.
   */
  url: string;
};

export type LinksWidgetProps = Omit<
  CollapsibleProps,
  'children' | 'disablePadding' | 'hasBorders'
> & {
  /**
   * Should the links be ordered?
   *
   * @default false
   */
  isOrdered?: boolean;
  /**
   * The links.
   */
  items: LinksWidgetItemData[];
};

const LinksWidgetWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  LinksWidgetProps
> = ({ isOrdered = false, items, ...props }, ref) => {
  const listClass = [
    styles.list,
    styles[isOrdered ? 'list--ordered' : 'list--unordered'],
  ].join(' ');

  const getLinksList = useCallback(
    (data: LinksWidgetItemData[]) => (
      <List className={listClass} hideMarker isOrdered={isOrdered}>
        {data.map((item) => (
          <ListItem className={styles.item} key={item.id}>
            <Link className={styles.link} href={item.url}>
              {item.label}
            </Link>
            {item.child?.length ? getLinksList(item.child) : null}
          </ListItem>
        ))}
      </List>
    ),
    [isOrdered, listClass]
  );

  return (
    <Collapsible {...props} disablePadding hasBorders ref={ref}>
      {getLinksList(items)}
    </Collapsible>
  );
};

/**
 * LinksWidget component
 *
 * Render a list of links inside a widget.
 */
export const LinksWidget = forwardRef(LinksWidgetWithRef);
