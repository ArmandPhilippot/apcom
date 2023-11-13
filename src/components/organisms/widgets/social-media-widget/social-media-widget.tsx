import { forwardRef, type ForwardRefRenderFunction } from 'react';
import {
  List,
  ListItem,
  SocialLink,
  type SocialLinkProps,
} from '../../../atoms';
import { Collapsible, type CollapsibleProps } from '../../../molecules';

export type SocialMediaData = Required<
  Pick<SocialLinkProps, 'icon' | 'id' | 'label' | 'url'>
>;

export type SocialMediaProps = Omit<CollapsibleProps, 'children'> & {
  media: SocialMediaData[];
};

const SocialMediaWidgetWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  SocialMediaProps
> = ({ media, ...props }, ref) => (
  <Collapsible {...props} ref={ref}>
    <List
      hideMarker
      isInline
      // eslint-disable-next-line react/jsx-no-literals
      spacing="xs"
    >
      {media.map(({ id, ...link }) => (
        <ListItem key={id}>
          <SocialLink {...link} />
        </ListItem>
      ))}
    </List>
  </Collapsible>
);

/**
 * Social Media widget component
 *
 * Render a social media list with links.
 */
export const SocialMediaWidget = forwardRef(SocialMediaWidgetWithRef);
