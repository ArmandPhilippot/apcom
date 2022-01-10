declare module '*.mdx' {
  import { Meta } from '@ts/types/app';

  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
  export const meta: Meta;
  export const intro: string;
  export const pdf: string;
  export const image: string;
}
