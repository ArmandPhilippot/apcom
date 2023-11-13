import type { EdgesResponse, GraphQLEdges, Maybe } from '../../../src/types';
import { settings } from '../../../src/utils/config';

/**
 * Retrieve the edges.
 *
 * @param {T[]} data - An array of objects.
 * @param {number} offset - The offset.
 * @returns {Array<Edge<T>>} The edges.
 */
export const getEdges = <T>(data: T[], offset: number): GraphQLEdges<T>[] =>
  data.map((singleData, index) => {
    const currentItemNumber = index + 1;

    return {
      cursor: `cursor${currentItemNumber + offset}`,
      node: singleData,
    };
  });

type GetConnectionProps<T> = {
  data: Maybe<T[]>;
  first: Maybe<number>;
  after: Maybe<string>;
};

/**
 * Retrieve a GraphQL connection.
 *
 * @param props - An object.
 * @param props.after - The number of items before.
 * @param props.data - An array of items.
 * @param props.first - The number of items per page.
 * @returns {Connection<T>} The connection.
 */
export const getConnection = <T>({
  after,
  data = [],
  first = settings.postsPerPage,
}: GetConnectionProps<T>): EdgesResponse<T> => {
  const afterInt = after ? Number(after.replace('cursor', '')) : 0;
  const edges = getEdges(data.slice(afterInt, afterInt + first), afterInt);
  const endCursor =
    edges.length > 0 ? edges[edges.length - 1].cursor : 'cursor1';

  return {
    edges,
    pageInfo: {
      endCursor,
      hasNextPage: data.length - afterInt > first,
      total: data.length,
    },
  };
};
