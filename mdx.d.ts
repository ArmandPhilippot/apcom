/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module '*.mdx' {
  type MDXProps = import('mdx/types').MDXProps;
  type MDXData = import('./src/types/data').MDXData;
  type MDXPageMeta = import('./src/types/data').MDXPageMeta;
  type MDXProjectMeta = import('./src/types/data').MDXProjectMeta;

  const MDXComponent: (props: MDXProps) => JSX.Element;
  export default MDXComponent;
  export const data: MDXData;
  export const meta: MDXPageMeta | MDXProjectMeta;
}
