declare module '*.mdx' {
  import { MDXData, MDXPageMeta, MDXProjectMeta } from '@ts/types/mdx';
  import { MDXProps } from 'mdx/types';

  let MDXComponent: (props: MDXProps) => JSX.Element;
  export default MDXComponent;
  export const data: MDXData;
  export const meta: MDXPageMeta | MDXProjectMeta;
}
