import { RawThematicPreview, TotalItems } from '@ts/types/raw-data';
import { EdgesResponse, EdgesVars, fetchAPI, getAPIUrl } from './api';
import { thematicsListQuery, totalThematicsQuery } from './thematics.query';

/**
 * Retrieve the total number of thematics.
 *
 * @returns {Promise<number>} - The thematics total number.
 */
export const getTotalThematics = async (): Promise<number> => {
  const response = await fetchAPI<TotalItems, typeof totalThematicsQuery>({
    api: getAPIUrl(),
    query: totalThematicsQuery,
  });

  return response.thematics.pageInfo.total;
};

/**
 * Retrieve the given number of thematics from API.
 *
 * @param {EdgesVars} props - An object of GraphQL variables.
 * @returns {Promise<EdgesResponse<RawThematicPreview>>} The thematics data.
 */
export const getThematicsPreview = async (
  props: EdgesVars
): Promise<EdgesResponse<RawThematicPreview>> => {
  const response = await fetchAPI<
    RawThematicPreview,
    typeof thematicsListQuery
  >({ api: getAPIUrl(), query: thematicsListQuery, variables: props });

  return response.thematics;
};
