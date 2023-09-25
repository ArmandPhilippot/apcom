/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module '*.mdx' {
  type MDXProps = import('mdx/types').MDXProps;
  type MDXData = import('./src/types/mdx').MDXData;
  type MDXPageMeta = import('./src/types/mdx').MDXPageMeta;
  type MDXProjectMeta = import('./src/types/mdx').MDXProjectMeta;

  const MDXComponent: (props: MDXProps) => JSX.Element;
  export default MDXComponent;
  export const data: MDXData;
  export const meta: MDXPageMeta | MDXProjectMeta;
}
