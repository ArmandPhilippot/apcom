import type { MDXComponents } from 'mdx/types';
import NextImage from 'next/image';
import type { AnchorHTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import {
  ButtonLink,
  Figure,
  Heading,
  Icon,
  Link,
  List,
  ListItem,
} from './atoms';
import { Code, Grid, GridItem } from './molecules';
import { PageSection } from './templates';

const Anchor = ({
  children = '',
  href = '',
  hrefLang,
  rel,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <Link
    {...props}
    isExternal={rel?.includes('external')}
    href={href}
    lang={hrefLang}
    rel={rel}
  >
    {children}
  </Link>
);

const Img = ({
  alt,
  src,
  height,
  width,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
  if (src)
    return (
      <NextImage
        {...props}
        alt={alt ?? ''}
        height={typeof height === 'string' ? Number(height) : height}
        src={src}
        width={typeof width === 'string' ? Number(width) : width}
        unoptimized={src.endsWith('.gif')}
      />
    );

  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={alt} height={height} src={src} width={width} />;
};

const Gallery = ({ children }: { children: ReactNode }) => (
  <Grid
    // eslint-disable-next-line react/jsx-no-literals
    gap="sm"
    // eslint-disable-next-line react/jsx-no-literals
    sizeMin="250px"
  >
    {children}
  </Grid>
);

export const mdxComponents: MDXComponents = {
  a: Anchor,
  ButtonLink,
  Code,
  figure: ({ ref, ...props }) => <Figure {...props} />,
  Figure,
  Gallery,
  Grid,
  GridItem,
  h1: ({ ref, ...props }) => <Heading {...props} level={1} />,
  h2: ({ ref, ...props }) => <Heading {...props} level={2} />,
  h3: ({ ref, ...props }) => <Heading {...props} level={3} />,
  h4: ({ ref, ...props }) => <Heading {...props} level={4} />,
  h5: ({ ref, ...props }) => <Heading {...props} level={5} />,
  h6: ({ ref, ...props }) => <Heading {...props} level={6} />,
  Icon,
  img: Img,
  Img,
  li: ({ ref, ...props }) => <ListItem {...props} />,
  Link,
  List,
  ListItem,
  PageSection,
  ol: ({ ref, ...props }) => (
    <List
      // eslint-disable-next-line react/jsx-no-literals
      spacing="2xs"
      {...props}
      isOrdered
    />
  ),
  ul: ({ ref, ...props }) => (
    <List
      // eslint-disable-next-line react/jsx-no-literals
      spacing="2xs"
      {...props}
    />
  ),
};
