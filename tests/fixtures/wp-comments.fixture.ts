import type { WPComment } from '../../src/types';

export const wpCommentsFixture: WPComment[] = [
  {
    approved: true,
    author: {
      node: {
        avatar: {
          height: 96,
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1225.jpg',
          width: 96,
        },
        name: 'London70',
        url: null,
      },
    },
    content:
      'Aliquid dolore molestiae eaque. Sint velit consectetur nesciunt est maxime. Ut qui harum ut quae iure. Voluptatem eius aut tempore repudiandae corrupti dignissimos.',
    databaseId: 1,
    date: '2022-04-21',
    parentDatabaseId: 0,
    status: 'APPROVE',
  },
  {
    approved: true,
    author: {
      node: {
        avatar: {
          height: 96,
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/168.jpg',
          width: 96,
        },
        name: 'Wilburn.Tillman5',
        url: null,
      },
    },
    content:
      'Sit labore quia excepturi repellat minus exercitationem. Nihil veniam sed voluptas a doloremque voluptatum. Quia accusantium totam accusamus quia qui dolorem autem ut. Et reprehenderit voluptates.',
    databaseId: 2,
    date: '2022-05-11',
    parentDatabaseId: 0,
    status: 'APPROVE',
  },
  {
    approved: true,
    author: {
      node: {
        avatar: {
          height: 96,
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/419.jpg',
          width: 96,
        },
        name: 'Addison27',
        url: 'https://example.test',
      },
    },
    content:
      'Cupiditate beatae ea vel dolore porro magnam in. Nostrum eum corrupti. Exercitationem cupiditate deserunt sunt quia quia ipsum placeat sit. Est maiores dolor qui. A tempora repellendus cumque voluptatem omnis beatae dolor nobis. Quis aut eos.',
    databaseId: 3,
    date: '2022-05-16',
    parentDatabaseId: 1,
    status: 'APPROVE',
  },
  {
    approved: true,
    author: {
      node: {
        avatar: {
          height: 96,
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/810.jpg',
          width: 96,
        },
        name: 'Mariana20',
        url: null,
      },
    },
    content:
      'Placeat iste unde. Et ad rem aut dolor placeat sunt aliquid aliquam. Dolor repellendus quis alias consequatur nihil.',
    databaseId: 4,
    date: '2022-05-17',
    parentDatabaseId: 0,
    status: 'APPROVE',
  },
  {
    approved: false,
    author: {
      node: {
        avatar: {
          height: 96,
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1202.jpg',
          width: 96,
        },
        name: 'Willow8',
        url: null,
      },
    },
    content:
      'Debitis quia fuga itaque voluptatem consequatur dolores. Praesentium quibusdam non sequi. Inventore voluptatem qui ad. Aperiam labore maxime qui necessitatibus. Sed molestias veritatis et.',
    databaseId: 4,
    date: '2022-06-02',
    parentDatabaseId: 2,
    status: 'HOLD',
  },
];
