import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type { ThematicsCountResponse } from '../../../../src/services/graphql';
import type { GraphQLPostWhere } from '../../../../src/types';
import { wpThematicsFixture } from '../../../fixtures';
import { getConnection } from '../../../utils/graphql';
import { schema } from '../../schema';

export const thematicsCountHandler = graphql.query<
  ThematicsCountResponse,
  GraphQLPostWhere
>('ThematicsCount', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { thematics: null } });

  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      thematics({ search, title }: typeof variables) {
        const filteredThematicsByTitle = title
          ? wpThematicsFixture.filter((thematic) =>
              thematic.title.includes(title)
            )
          : wpThematicsFixture;
        const filteredThematics = search
          ? filteredThematicsByTitle.filter((thematic) =>
              thematic.title.includes(search)
            )
          : filteredThematicsByTitle;

        return getConnection({
          after: null,
          data: filteredThematics,
          first: undefined,
        });
      },
    },
  })) as ExecutionResult<ThematicsCountResponse>;

  return HttpResponse.json({ data, errors });
});
