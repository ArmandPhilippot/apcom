import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type {
  FetchPostsListInput,
  PostsListResponse,
} from '../../../../src/services/graphql';
import { wpPostsFixture } from '../../../fixtures';
import { getConnection } from '../../../utils/graphql';
import { schema } from '../../schema';

export const postsListHandler = graphql.query<
  PostsListResponse,
  FetchPostsListInput
>('PostsList', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { posts: null } });

  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      posts({ after, first, where }: typeof variables) {
        const { authorName, search, title } = where ?? {};
        const filteredPostsByAuthor = authorName
          ? wpPostsFixture.filter((post) =>
              post.author.node.name.includes(authorName)
            )
          : wpPostsFixture;
        const filteredPostsByTitle = title
          ? filteredPostsByAuthor.filter((post) => post.title.includes(title))
          : filteredPostsByAuthor;
        const filteredPosts = search
          ? filteredPostsByTitle.filter(
              (post) =>
                post.title.includes(search) ||
                post.contentParts.afterMore.includes(search) ||
                post.contentParts.beforeMore.includes(search)
            )
          : filteredPostsByTitle;

        return getConnection({ after, data: filteredPosts, first });
      },
    },
  })) as ExecutionResult<PostsListResponse>;

  return HttpResponse.json({ data, errors });
});
