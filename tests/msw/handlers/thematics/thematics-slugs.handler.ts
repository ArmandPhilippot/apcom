import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type { ThematicsSlugsResponse } from '../../../../src/services/graphql';
import { wpThematicsFixture } from '../../../fixtures';
import { schema } from '../../schema';

export const thematicsSlugsHandler = graphql.query<
  ThematicsSlugsResponse,
  Record<'first', number>
>('ThematicsSlugs', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { thematics: null } });

  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      thematics: { nodes: wpThematicsFixture },
    },
  })) as ExecutionResult<ThematicsSlugsResponse>;

  return HttpResponse.json({ data, errors });
});
