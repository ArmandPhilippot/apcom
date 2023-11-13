import {
  forwardRef,
  type ForwardRefRenderFunction,
  type ReactNode,
} from 'react';
import { Figure, Link, type FigureProps } from '../../../atoms';
import { Collapsible, type CollapsibleProps } from '../../../molecules';
import styles from './image-widget.module.scss';

export type ImageWidgetProps = Omit<CollapsibleProps, 'children'> & {
  /**
   * Add a caption to the image.
   */
  description?: FigureProps['caption'];
  /**
   * The image.
   */
  img: ReactNode;
  /**
   * Add a link to the image.
   */
  url?: string;
};

const ImageWidgetWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  ImageWidgetProps
> = ({ description, img, isCollapsed, url, ...props }, ref) => (
  <Collapsible {...props} ref={ref}>
    <Figure caption={description} hasBorders>
      {url ? (
        <Link className={styles.link} href={url}>
          {img}
        </Link>
      ) : (
        img
      )}
    </Figure>
  </Collapsible>
);

/**
 * ImageWidget component
 *
 * Renders a widget that print an image and an optional text.
 */
export const ImageWidget = forwardRef(ImageWidgetWithRef);
