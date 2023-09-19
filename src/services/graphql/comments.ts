import { SingleComment } from '../../types/app';
import { GraphQLEdgesInput } from '../../types/graphql/generics';
import { SendCommentInput, SentComment } from '../../types/graphql/mutations';
import { ContentId } from '../../types/graphql/queries';
import { RawComment, RawCommentsPage } from '../../types/raw-data';
import { getAuthorFromRawData } from '../../utils/helpers/author';
import { fetchAPI } from './api';
import { sendCommentMutation } from './comments.mutation';
import { commentsQuery } from './comments.query';

/**
 * Convert a comment from RawComment type to SingleComment type.
 *
 * @param {RawComment} comment - A raw comment.
 * @returns {SingleComment} A formatted comment.
 */
export const getCommentFromRawData = (comment: RawComment): SingleComment => {
  const { author, databaseId, date, parentDatabaseId, ...data } = comment;

  return {
    id: databaseId,
    meta: {
      author: getAuthorFromRawData(author.node, 'comment'),
      date,
    },
    parentId: parentDatabaseId === 0 ? undefined : parentDatabaseId,
    replies: [],
    ...data,
  };
};

/**
 * Convert an array of RawComment type to an array of SingleComment type.
 *
 * @param {RawComment[]} comments - The raw comments.
 * @returns {SingleComment[]} The formatted comments.
 */
export const getCommentsFromRawData = (
  comments: RawComment[]
): SingleComment[] => {
  return comments.map((comment) => getCommentFromRawData(comment));
};

/**
 * Create a comments tree with replies.
 *
 * @param {SingleComment[]} comments - A flatten comments list.
 * @returns {SingleComment[]} An array of comments with replies.
 */
export const buildCommentsTree = (
  comments: SingleComment[]
): SingleComment[] => {
  type CommentsHashTable = {
    [key: string]: SingleComment;
  };

  const hashTable: CommentsHashTable = Object.create(null);
  const commentsTree: SingleComment[] = [];

  comments.forEach(
    (comment) => (hashTable[comment.id] = { ...comment, replies: [] })
  );

  comments.forEach((comment) => {
    if (!comment.parentId) {
      commentsTree.push(hashTable[comment.id]);
    } else {
      hashTable[comment.parentId].replies.push(hashTable[comment.id]);
    }
  });

  return commentsTree;
};

type FetchCommentsInput = ContentId &
  Pick<GraphQLEdgesInput, 'after' | 'first'>;

/**
 * Retrieve a raw comments page from GraphQL.
 *
 * @param {FetchCommentsInput} variables - An object of variables.
 * @returns {Promise<RawCommentsPage>} A raw comments page.
 */
export const fetchRawComments = async (
  variables: FetchCommentsInput
): Promise<RawCommentsPage> => {
  const response = await fetchAPI<RawComment, typeof commentsQuery>({
    query: commentsQuery,
    variables,
  });

  return {
    comments: response.comments.edges.map((edge) => edge.node),
    hasNextPage: response.comments.pageInfo.hasNextPage,
    endCursor: response.comments.pageInfo.endCursor,
  };
};

/**
 * Fetch recursively all the comments on a post.
 *
 * @param {FetchCommentsInput} variables - An object of query variables.
 * @param {RawCommentsPage[]} pages - An accumulator to keep track of pages.
 * @returns {Promise<RawCommentsPage[]>} The raw comments pages.
 */
export const fetchAllRawCommentsPages = async (
  variables: FetchCommentsInput,
  pages: RawCommentsPage[] = []
): Promise<RawCommentsPage[]> => {
  return fetchRawComments(variables).then((page) => {
    pages.push(page);

    if (page.hasNextPage) {
      return fetchAllRawCommentsPages(
        { ...variables, after: page.endCursor },
        pages
      );
    } else {
      return pages;
    }
  });
};

/**
 * Method to compare two comments dates and sort them from older to newest.
 *
 * @param {SingleComment} a - A comment.
 * @param {SingleComment} b - Another comment.
 * @returns {number} The difference between dates.
 */
export const compareCommentsDate = (
  a: SingleComment,
  b: SingleComment
): number => {
  return +new Date(a.meta.date) - +new Date(b.meta.date);
};

/**
 * Retrieve all the comments on a post.
 *
 * @param {number} id - A post id.
 * @returns {Promise<SingleComment[]>} The comments list.
 */
export const getAllComments = async ({
  contentId,
}: {
  contentId: number;
}): Promise<SingleComment[]> => {
  const pages = await fetchAllRawCommentsPages({ contentId });
  const comments = pages
    .map((page) => getCommentsFromRawData(page.comments))
    .flat()
    .sort(compareCommentsDate);

  return buildCommentsTree(comments);
};

/**
 * Send a comment using GraphQL API.
 *
 * @param {SendCommentVars} data - The comment data.
 * @returns {Promise<SentComment>} The mutation response.
 */
export const sendComment = async (
  data: SendCommentInput
): Promise<SentComment> => {
  const response = await fetchAPI<SentComment, typeof sendCommentMutation>({
    query: sendCommentMutation,
    variables: { ...data },
  });

  return response.createComment;
};
