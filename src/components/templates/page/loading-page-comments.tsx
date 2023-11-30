import {
  forwardRef,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
} from 'react';
import { useIntl } from 'react-intl';
import { Spinner } from '../../atoms';
import styles from './page.module.scss';

export type LoadingPageCommentsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
>;

const LoadingPageCommentsWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  LoadingPageCommentsProps
> = ({ className = '', ...props }, ref) => {
  const wrapperClass = `${styles.comments} ${className}`;
  const intl = useIntl();
  const loadingMsg = intl.formatMessage({
    defaultMessage: 'The comments are loading...',
    description: 'LoadingPageComments: loading message',
    id: 'gYbxP4',
  });

  return (
    <div {...props} className={wrapperClass} ref={ref}>
      <Spinner className={styles.spinner}>{loadingMsg}</Spinner>
    </div>
  );
};

export const LoadingPageComments = forwardRef(LoadingPageCommentsWithRef);
