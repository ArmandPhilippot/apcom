import type { SingleComment } from '../../../types/app';

export const comments: SingleComment[] = [
  {
    approved: true,
    content:
      'Voluptas ducimus inventore. Libero ut et doloribus. Earum nostrum ab. Aliquam rem dolores omnis voluptate. Sunt aut ut et.',
    id: 1,
    meta: {
      author: {
        avatar: {
          alt: 'Author 1 avatar',
          height: 480,
          src: 'http://picsum.photos/640/480',
          width: 640,
        },
        name: 'Author 1',
      },
      date: '2021-04-03 18:04:11',
    },
    parentId: 0,
    replies: [],
  },
  {
    approved: true,
    content:
      'Sit sed error quasi voluptatem velit voluptas aut. Aut debitis eveniet. Praesentium dolores quia voluptate vero quis dicta quasi vel. Aut voluptas accusantium ut aut quidem consectetur itaque laboriosam rerum.',
    id: 2,
    meta: {
      author: {
        avatar: {
          alt: 'Author 2 avatar',
          height: 480,
          src: 'http://picsum.photos/640/480',
          width: 640,
        },
        name: 'Author 2',
        website: '#',
      },
      date: '2021-04-03 23:30:20',
    },
    parentId: 0,
    replies: [
      {
        approved: true,
        content:
          'Vel ullam in porro tempore. Maiores quos quia magnam beatae nemo libero velit numquam. Sapiente aliquid cumque. Velit neque in adipisci aut assumenda voluptates earum. Autem esse autem provident in tempore. Aut distinctio dolor qui repellat et et adipisci velit aspernatur.',
        id: 4,
        meta: {
          author: {
            avatar: {
              alt: 'Author 4 avatar',
              height: 480,
              src: 'http://picsum.photos/640/480',
              width: 640,
            },
            name: 'Author 4',
          },
          date: '2021-04-03 23:04:24',
        },
        parentId: 2,
        replies: [],
      },
      {
        approved: true,
        content:
          'Sed non omnis. Quam porro est. Quae tempore quae. Exercitationem eos non velit voluptatem velit voluptas iusto. Sit debitis qui ipsam quo asperiores numquam veniam praesentium ut.',
        id: 5,
        meta: {
          author: {
            avatar: {
              alt: 'Author 1 avatar',
              height: 480,
              src: 'http://picsum.photos/640/480',
              width: 640,
            },
            name: 'Author 1',
          },
          date: '2021-04-04 08:05:14',
        },
        parentId: 2,
        replies: [],
      },
    ],
  },
  {
    approved: false,
    content:
      'Natus consequatur maiores aperiam dolore eius nesciunt ut qui et. Ab ea nobis est. Eaque dolor corrupti id aut. Impedit architecto autem qui neque rerum ab dicta dignissimos voluptates.',
    id: 3,
    meta: {
      author: {
        avatar: {
          alt: 'Author 3',
          height: 480,
          src: 'http://picsum.photos/640/480',
          width: 640,
        },
        name: 'Author 3',
      },
      date: '2021-09-13 13:24:54',
    },
    parentId: 0,
    replies: [],
  },
];

export const saveComment = () => undefined;
