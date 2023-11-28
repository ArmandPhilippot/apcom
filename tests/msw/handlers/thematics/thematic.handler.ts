import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type { ThematicResponse } from '../../../../src/services/graphql';
import { wpThematicsFixture } from '../../../fixtures';
import { schema } from '../../schema';

export const thematicHandler = graphql.query<
  ThematicResponse,
  Record<'slug', string>
>('Thematic', async ({ query, variables }) => {
  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      thematic: wpThematicsFixture.find(
        (wpThematic) => wpThematic.slug === variables.slug
      ),
    },
  })) as ExecutionResult<ThematicResponse>;

  return HttpResponse.json({ data, errors });
});
