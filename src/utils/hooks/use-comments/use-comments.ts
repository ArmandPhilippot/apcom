import useSWR from 'swr';
import {
  type FetchCommentsListInput,
  buildCommentsTree,
  convertWPCommentToComment,
  fetchCommentsList,
} from '../../../services/graphql';
import type { Maybe, SingleComment, WPComment } from '../../../types';

export type UseCommentsReturn<T extends Maybe<WPComment[]>> = {
  comments: T extends undefined ? Maybe<SingleComment[]> : SingleComment[];
  isError: boolean;
  isLoading: boolean;
  isValidating: boolean;
};

export type UseCommentsConfig<T extends Maybe<WPComment[]>> =
  FetchCommentsListInput & {
    fallback?: T;
  };

export const useComments = <T extends Maybe<WPComment[]>>({
  fallback,
  ...input
}: UseCommentsConfig<T>): UseCommentsReturn<T> => {
  const { data, error, isLoading, isValidating } = useSWR(
    input,
    fetchCommentsList,
    { fallbackData: fallback }
  );

  if (error) console.error(error);

  return {
    comments: data
      ? buildCommentsTree(data.map(convertWPCommentToComment))
      : undefined,
    isError: !!error,
    isLoading,
    isValidating,
  } as UseCommentsReturn<T>;
};
