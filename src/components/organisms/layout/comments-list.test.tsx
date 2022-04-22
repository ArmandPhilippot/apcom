import { render } from '@test-utils';
import CommentsList, { type Comment } from './comments-list';

const comments: Comment[] = [
  {
    author: {
      avatar: 'http://placeimg.com/640/480',
      name: 'Author 1',
    },
    content:
      'Voluptas ducimus inventore. Libero ut et doloribus. Earum nostrum ab. Aliquam rem dolores omnis voluptate. Sunt aut ut et.',
    id: 1,
    publication: '2021-04-03 18:04:11',
  },
  {
    child: [
      {
        author: {
          avatar: 'http://placeimg.com/640/480',
          name: 'Author 4',
        },
        content:
          'Vel ullam in porro tempore. Maiores quos quia magnam beatae nemo libero velit numquam. Sapiente aliquid cumque. Velit neque in adipisci aut assumenda voluptates earum. Autem esse autem provident in tempore. Aut distinctio dolor qui repellat et et adipisci velit aspernatur.',
        id: 4,
        publication: '2021-04-03 23:04:24',
      },
      {
        author: {
          avatar: 'http://placeimg.com/640/480',
          name: 'Author 1',
        },
        content:
          'Sed non omnis. Quam porro est. Quae tempore quae. Exercitationem eos non velit voluptatem velit voluptas iusto. Sit debitis qui ipsam quo asperiores numquam veniam praesentium ut.',
        id: 5,
        publication: '2021-04-04 08:05:14',
      },
    ],
    author: {
      avatar: 'http://placeimg.com/640/480',
      name: 'Author 2',
      url: '#',
    },
    content:
      'Sit sed error quasi voluptatem velit voluptas aut. Aut debitis eveniet. Praesentium dolores quia voluptate vero quis dicta quasi vel. Aut voluptas accusantium ut aut quidem consectetur itaque laboriosam occaecati.',
    id: 2,
    publication: '2021-04-03 23:30:20',
  },
  {
    author: {
      avatar: 'http://placeimg.com/640/480',
      name: 'Author 3',
    },
    content:
      'Natus consequatur maiores aperiam dolore eius nesciunt ut qui et. Ab ea nobis est. Eaque dolor corrupti id aut. Impedit architecto autem qui neque rerum ab dicta dignissimos voluptates.',
    id: 3,
    publication: '2021-05-13 13:24:54',
  },
];

describe('CommentsList', () => {
  it('renders a comments list', () => {
    render(
      <CommentsList comments={comments} depth={1} saveComment={() => null} />
    );
  });
});
