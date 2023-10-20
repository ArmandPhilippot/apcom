import {
  type ForwardRefRenderFunction,
  forwardRef,
  type ReactNode,
} from 'react';
import { List, ListItem, type ListProps } from '../../atoms';
import { NavLink } from '../nav';
import styles from './colophon.module.scss';

export type ColophonLink = {
  id: string;
  href: string;
  label: ReactNode;
};

export type ColophonProps = Omit<ListProps<false, false>, 'children'> & {
  /**
   * The website copyright.
   */
  copyright: ReactNode;
  /**
   * The website license.
   */
  license?: ReactNode;
  /**
   * The colophon links (ie. legal notice)
   */
  links?: ColophonLink[];
};

const ColophonWithRef: ForwardRefRenderFunction<
  HTMLUListElement,
  ColophonProps
> = ({ className = '', copyright, license, links, ...props }, ref) => {
  const colophonClass = `${styles.list} ${className}`;

  return (
    <List
      {...props}
      className={colophonClass}
      isInline
      ref={ref}
      // eslint-disable-next-line react/jsx-no-literals -- Spacing allowed
      spacing="2xs"
    >
      <ListItem className={styles.legal} hideMarker>
        {copyright}
        {license}
      </ListItem>
      {links?.map(({ id, ...link }) => (
        <ListItem key={id}>
          <NavLink {...link} />
        </ListItem>
      ))}
    </List>
  );
};

export const Colophon = forwardRef(ColophonWithRef);
