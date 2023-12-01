import type { WPPost } from '../../src/types';

export const wpPostsFixture = [
  {
    acfPosts: null,
    author: {
      node: {
        name: 'Alisha.Dare45',
      },
    },
    commentCount: 2,
    contentParts: {
      afterMore:
        'Velit rerum ea ex at esse sunt eum corporis. Autem sunt et. Earum consectetur alias enim officiis nesciunt.',
      beforeMore:
        'Architecto quasi consequuntur. Ut sint perspiciatis dolor non iure et ut. Reiciendis id minus perferendis vero.',
    },
    databaseId: 1,
    date: '2022-11-02',
    featuredImage: null,
    info: {
      wordsCount: 400,
    },
    modified: '2022-11-02',
    seo: {
      metaDesc: 'Repudiandae autem numquam.',
      title: 'similique atque corporis',
    },
    slug: '/post-1',
    title: 'Post 1',
  },
  {
    acfPosts: null,
    author: {
      node: {
        name: 'Alisha.Dare45',
      },
    },
    commentCount: null,
    contentParts: {
      afterMore:
        'Accusantium voluptatem ullam. Culpa et qui voluptatibus earum commodi expedita dolor. Aut suscipit corporis exercitationem tempora sapiente. Deleniti velit assumenda voluptatum et rem inventore soluta hic distinctio. Excepturi dolorum maxime voluptas. Ducimus et aut quia ex.',
      beforeMore:
        'Et illo voluptates. Nihil sed error. Quas et similique incidunt quae in rem omnis. Odit distinctio magni et qui tempora pariatur eius perferendis.',
    },
    databaseId: 2,
    date: '2022-11-03',
    featuredImage: {
      node: {
        altText: null,
        mediaDetails: {
          height: 480,
          width: 640,
        },
        sourceUrl: 'https://picsum.photos/640/480',
        title: null,
      },
    },
    info: {
      wordsCount: 520,
    },
    modified: '2022-11-04',
    seo: {
      metaDesc: 'Veritatis deleniti et cum modi id necessitatibus dolores.',
      title: 'numquam nihil voluptas',
    },
    slug: '/post-2',
    title: 'Post 2',
  },
  {
    acfPosts: {
      postsInThematic: [
        {
          databaseId: 2,
          slug: '/thematic-1',
          title: 'Thematic 1',
        },
      ],
      postsInTopic: null,
    },
    author: {
      node: {
        name: 'Alisha.Dare45',
      },
    },
    commentCount: 1,
    contentParts: {
      afterMore:
        'Animi facere velit in voluptate facere non repellat magni. Aut est dicta et mollitia blanditiis dolores. Est minima voluptatibus eveniet.',
      beforeMore:
        'Consequatur odit voluptatum est est accusantium. Nobis aspernatur qui. Magni ut facere laudantium voluptatem autem quia voluptas.',
    },
    databaseId: 3,
    date: '2022-11-06',
    featuredImage: {
      node: {
        altText: 'qui officia est',
        mediaDetails: {
          height: 480,
          width: 640,
        },
        sourceUrl: 'https://picsum.photos/640/480',
        title: null,
      },
    },
    info: {
      wordsCount: 320,
    },
    modified: '2022-11-06',
    seo: {
      metaDesc:
        'Ut deserunt qui reprehenderit ut veritatis consequatur quia corporis.',
      title: 'laboriosam incidunt enim',
    },
    slug: '/post-3',
    title: 'Post 3',
  },
  {
    acfPosts: {
      postsInThematic: [
        {
          databaseId: 3,
          slug: '/thematic-2',
          title: 'Thematic 2',
        },
        {
          databaseId: 4,
          slug: '/thematic-3',
          title: 'Thematic 3',
        },
      ],
      postsInTopic: [
        {
          databaseId: 2,
          featuredImage: null,
          slug: '/topic-1',
          title: 'Topic 1',
        },
      ],
    },
    author: {
      node: {
        name: 'Alisha.Dare45',
      },
    },
    commentCount: 5,
    contentParts: {
      afterMore:
        'Consequuntur inventore labore enim rerum ut. Ut et sit tempora provident. Aliquid nihil dolorem dolorum assumenda doloremque perspiciatis similique debitis voluptas.',
      beforeMore:
        'Adipisci velit voluptatum unde consequatur amet. In aliquam animi qui non ut.',
    },
    databaseId: 4,
    date: '2022-11-08',
    featuredImage: {
      node: {
        altText: 'est dolorum maxime',
        mediaDetails: {
          height: 480,
          width: 640,
        },
        sourceUrl: 'https://picsum.photos/640/480',
        title: 'nostrum quisquam officiis',
      },
    },
    info: {
      wordsCount: 650,
    },
    modified: '2022-11-11',
    seo: {
      metaDesc: 'In ipsam pariatur laboriosam aut alias molestiae.',
      title: 'fugit et sunt',
    },
    slug: '/post-4',
    title: 'Post 4',
  },
] satisfies WPPost[];
