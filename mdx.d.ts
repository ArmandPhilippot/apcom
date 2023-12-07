/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module '*.mdx' {
  type MDXContent = import('mdx/types').MDXContent;
  type ComponentType = import('react').ComponentType;
  type MDXData = import('./src/types/data').MDXData;
  type MDXPageMeta = import('./src/types/data').MDXPageMeta;
  type MDXProjectMeta = import('./src/types/data').MDXProjectMeta;

  export default ComponentType<MDXContent>;
  export const data: MDXData;
  export const meta: MDXPageMeta | MDXProjectMeta;
}
