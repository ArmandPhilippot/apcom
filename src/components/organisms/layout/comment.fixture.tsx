import { getFormattedDate, getFormattedTime } from '../../../utils/helpers';
import { CommentProps } from './comment';

export const author = {
  avatar: {
    alt: 'Author avatar',
    height: 480,
    src: 'http://placeimg.com/640/480',
    width: 640,
  },
  name: 'Armand',
  website: 'https://www.armandphilippot.com/',
};

export const content =
  'Harum aut cumque iure fugit neque sequi cupiditate repudiandae laudantium. Ratione aut assumenda qui illum voluptas accusamus quis officiis exercitationem. Consectetur est harum eius perspiciatis officiis nihil. Aut corporis minima debitis adipisci possimus debitis et.';

export const date = '2021-04-03 23:04:24';

export const meta = {
  author,
  date,
};

export const id = 5;

export const saveComment = async () => {
  /** Do nothing. */
};

export const data: CommentProps = {
  approved: true,
  content,
  id,
  meta,
  parentId: 0,
  saveComment,
};

export const formattedDate = getFormattedDate(date);
export const formattedTime = getFormattedTime(date);
