import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type { PostsCountResponse } from '../../../../src/services/graphql';
import type { GraphQLPostWhere } from '../../../../src/types';
import { wpPostsFixture } from '../../../fixtures';
import { getConnection } from '../../../utils/graphql';
import { schema } from '../../schema';

export const postsCountHandler = graphql.query<
  PostsCountResponse,
  GraphQLPostWhere
>('PostsCount', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { posts: null } });

  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      posts({ authorName, search, title }: typeof variables) {
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

        return getConnection({
          after: null,
          data: filteredPosts,
          first: undefined,
        });
      },
    },
  })) as ExecutionResult<PostsCountResponse>;

  return HttpResponse.json({ data, errors });
});
