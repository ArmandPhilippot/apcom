import { type ExecutionResult, graphql } from 'graphql';
import { HttpResponse } from 'msw';
import type { ThematicResponse } from '../../../../src/services/graphql';
import { wpThematicsFixture } from '../../../fixtures';
import { wordpressAPI } from '../../instances';
import { schema } from '../../schema';

export const thematicHandler = wordpressAPI.query<
  ThematicResponse,
  Record<'slug', string>
>('Thematic', async ({ query, variables }) => {
  const { data, errors } = (await graphql({
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
