import useSWR from 'swr';
import { convertWPTopicToTopic, fetchTopic } from '../../../services/graphql';
import type { Maybe, Topic, WPTopic } from '../../../types';

export type UseTopicReturn<T extends Maybe<WPTopic>> = {
  isError: boolean;
  isLoading: boolean;
  isValidating: boolean;
  topic: T extends undefined ? Maybe<Topic> : Topic;
};

export const useTopic = <T extends Maybe<WPTopic>>(
  slug: string,
  fallback?: T
): UseTopicReturn<T> => {
  const { data, error, isLoading, isValidating } = useSWR(slug, fetchTopic, {
    fallbackData: fallback,
  });

  if (error) console.error(error);

  return {
    isError: !!error,
    isLoading,
    isValidating,
    topic: data ? convertWPTopicToTopic(data) : undefined,
  } as UseTopicReturn<T>;
};
