declare module '*.mdx' {
  import { MDXProps } from 'mdx/types';
  import { Meta } from '@ts/types/app';

  let MDXComponent: (props: MDXProps) => JSX.Element;
  export default MDXComponent;
  export const cover: string;
  export const image: string;
  export const intro: string;
  export const meta: Meta;
  export const pdf: string;
  export const seo: { title: string; description: string };
}
