import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type {
  FetchThematicsListInput,
  ThematicsListResponse,
} from '../../../../src/services/graphql';
import { wpThematicsFixture } from '../../../fixtures';
import { getConnection } from '../../../utils/graphql';
import { schema } from '../../schema';

export const thematicsListHandler = graphql.query<
  ThematicsListResponse,
  FetchThematicsListInput
>('ThematicsList', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { thematics: null } });

  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      thematics({ after, first, where }: typeof variables) {
        const { search, title } = where ?? {};
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

        return getConnection({ after, data: filteredThematics, first });
      },
    },
  })) as ExecutionResult<ThematicsListResponse>;

  return HttpResponse.json({ data, errors });
});
