import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../atoms';
import type { CommentData } from '../../organisms/comments-list';
import { SharingWidget, TocWidget } from '../../organisms/widgets';
import { Page } from './page';
import { PageBody } from './page-body';
import { PageComments } from './page-comments';
import { PageFooter } from './page-footer';
import { PageHeader } from './page-header';
import { PageSection } from './page-section';
import { PageSidebar } from './page-sidebar';

/**
 * Page - Storybook Meta
 */
export default {
  title: 'Templates/Page',
  component: Page,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

const comments = [
  {
    author: {
      name: 'Milan0',
      avatar: {
        alt: 'Milan0 avatar',
        src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/976.jpg',
      },
    },
    content: 'Fugit veniam quas qui dolor explicabo.',
    id: 1,
    isApproved: true,
    publicationDate: '2023-01-23',
    replies: [
      {
        author: { name: 'Haskell42' },
        content: 'Error quas accusamus nesciunt enim quae a.',
        id: 25,
        isApproved: true,
        publicationDate: '2023-02-04',
      },
      {
        author: { name: 'Hanna49', website: 'https://www.armandphilippot.com' },
        content: 'Ut ducimus neque aliquam soluta sed totam commodi cum sit.',
        id: 30,
        isApproved: true,
        publicationDate: '2023-03-10',
      },
    ],
  },
  {
    author: {
      name: 'Corrine9',
      avatar: {
        alt: 'Corrine9 avatar',
        src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/539.jpg',
      },
    },
    content:
      'Dolore hic iure voluptatum quam error minima. Quas ut aperiam sit commodi cumque consequatur. Voluptas debitis veritatis officiis in voluptas ea et laborum animi. Voluptatem qui enim neque. Et sunt quo neque assumenda iure. Non vel ut consectetur.',
    id: 2,
    isApproved: true,
    publicationDate: '2023-04-20',
  },
  {
    author: { name: 'Presley12' },
    content:
      'Nulla eaque similique recusandae enim aut eligendi iure consequatur. Et aut qui. Voluptatem a voluptatem consequatur aliquid distinctio ex culpa. Adipisci animi amet reprehenderit autem quia commodi voluptatum commodi.',
    id: 3,
    isApproved: true,
    publicationDate: '2023-05-01',
    replies: [
      {
        author: {
          name: 'Ana_Haley33',
          avatar: {
            alt: 'Ana_Haley33 avatar',
            src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/881.jpg',
          },
        },
        content: 'Ab ea et fugit autem.',
        id: 17,
        isApproved: true,
        publicationDate: '2023-05-01',
      },
      {
        author: { name: 'Santos.Harris17' },
        content:
          'Illo dolores voluptatem similique voluptas quasi hic aspernatur ab nisi.',
        id: 18,
        isApproved: false,
        publicationDate: '2023-05-02',
      },
    ],
  },
  {
    author: { name: 'Julius.Borer' },
    content: 'Ea fugit totam et voluptatum quidem laborum explicabo fuga quod.',
    id: 4,
    isApproved: true,
    publicationDate: '2023-06-15',
  },
  {
    author: { name: 'Geo87' },
    content:
      'Enim consequatur deleniti aliquid adipisci. Et mollitia saepe vel rerum totam praesentium assumenda repellat fuga. Ipsum ut architecto consequatur. Ut laborum suscipit sed corporis quas aliquid. Et et omnis quo. Dolore quia ipsum ut corporis eum et corporis qui.',
    id: 5,
    isApproved: false,
    publicationDate: '2023-06-16',
  },
  {
    author: { name: 'Kurt.Keeling' },
    content: 'Eligendi repellat officiis amet.',
    id: 6,
    isApproved: true,
    publicationDate: '2023-06-17',
  },
] satisfies CommentData[];

/**
 * Page Stories - HeaderBody
 */
export const HeaderBody = Template.bind({});
HeaderBody.args = {
  children: (
    <>
      <PageHeader
        heading="The page title"
        intro="Dolores deleniti et nemo fuga minus dicta enim dolores. Animi magnam dignissimos quaerat repellat autem alias. Recusandae pariatur autem et omnis eveniet. Magni fuga consequatur ut omnis debitis est error. Quos quae odit."
      />
      <PageBody>
        <Heading level={2}>Sint debitis blanditiis</Heading>
        <p>
          Exercitationem dolorum sed incidunt commodi sapiente fuga. Qui qui
          minima nulla ullam alias magnam et. Reiciendis ea voluptatem ab nisi
          est aut repudiandae eum magnam. Iusto ex ut velit voluptatem sequi
          facere voluptas.
        </p>
        <p>
          Vel ut ullam veritatis aut quaerat a eveniet. Voluptatem molestias
          atque rerum quam eos doloremque dolor dolor non. Rerum laudantium
          provident eos voluptas minus sit mollitia ex neque. Ea est ut est. Id
          quaerat repudiandae sint autem architecto adipisci est.
        </p>
        <Heading level={2}>Non nisi similique</Heading>
        <p>
          Non ut id. Dolorem in ex voluptas quis quod ut facere. Laboriosam non
          necessitatibus mollitia voluptatibus dolorem non ducimus. Et non illo
          aut quasi accusantium fugiat laudantium veritatis. Odit dicta vel et
          et rem ipsa nihil. Possimus architecto voluptatibus labore repellat
          sint aperiam reprehenderit est ratione.
        </p>
        <p>
          Nemo quod est ex ut et quasi. Sed minima voluptatem dolore. Non dolore
          placeat eos qui praesentium sunt dolores. Consequatur atque quibusdam
          tempore aut. Quas officiis adipisci consequatur nisi. Quasi veniam qui
          mollitia sapiente eius ratione necessitatibus nobis molestiae.
        </p>
      </PageBody>
    </>
  ),
};

/**
 * Page Stories - BreadcrumbsHeaderBody
 */
export const BreadcrumbsHeaderBody = Template.bind({});
BreadcrumbsHeaderBody.args = {
  breadcrumbs: [
    { id: 'home', name: 'Home', url: '#home' },
    { id: 'blog', name: 'Blog', url: '#blog' },
  ],
  children: (
    <>
      <PageHeader
        heading="The page title"
        intro="Dolores deleniti et nemo fuga minus dicta enim dolores. Animi magnam dignissimos quaerat repellat autem alias. Recusandae pariatur autem et omnis eveniet. Magni fuga consequatur ut omnis debitis est error. Quos quae odit."
      />
      <PageBody>
        <Heading level={2}>Sint debitis blanditiis</Heading>
        <p>
          Exercitationem dolorum sed incidunt commodi sapiente fuga. Qui qui
          minima nulla ullam alias magnam et. Reiciendis ea voluptatem ab nisi
          est aut repudiandae eum magnam. Iusto ex ut velit voluptatem sequi
          facere voluptas.
        </p>
        <p>
          Vel ut ullam veritatis aut quaerat a eveniet. Voluptatem molestias
          atque rerum quam eos doloremque dolor dolor non. Rerum laudantium
          provident eos voluptas minus sit mollitia ex neque. Ea est ut est. Id
          quaerat repudiandae sint autem architecto adipisci est.
        </p>
        <Heading level={2}>Non nisi similique</Heading>
        <p>
          Non ut id. Dolorem in ex voluptas quis quod ut facere. Laboriosam non
          necessitatibus mollitia voluptatibus dolorem non ducimus. Et non illo
          aut quasi accusantium fugiat laudantium veritatis. Odit dicta vel et
          et rem ipsa nihil. Possimus architecto voluptatibus labore repellat
          sint aperiam reprehenderit est ratione.
        </p>
        <p>
          Nemo quod est ex ut et quasi. Sed minima voluptatem dolore. Non dolore
          placeat eos qui praesentium sunt dolores. Consequatur atque quibusdam
          tempore aut. Quas officiis adipisci consequatur nisi. Quasi veniam qui
          mollitia sapiente eius ratione necessitatibus nobis molestiae.
        </p>
      </PageBody>
    </>
  ),
};

/**
 * Page Stories - HeaderBodyToc
 */
export const HeaderBodyToc = Template.bind({});
HeaderBodyToc.args = {
  children: (
    <>
      <PageHeader
        heading="The page title"
        intro="Dolores deleniti et nemo fuga minus dicta enim dolores. Animi magnam dignissimos quaerat repellat autem alias. Recusandae pariatur autem et omnis eveniet. Magni fuga consequatur ut omnis debitis est error. Quos quae odit."
      />
      <PageSidebar>
        <TocWidget
          heading={<Heading level={2}>Table of Contents</Heading>}
          tree={[
            {
              children: [],
              depth: 2,
              id: 'sint-debitis',
              label: 'Sint debitis blanditiis',
            },
            {
              children: [],
              depth: 2,
              id: 'non-nisi',
              label: 'Non nisi similique',
            },
          ]}
        />
      </PageSidebar>
      <PageBody>
        <Heading id="sint-debitis" level={2}>
          Sint debitis blanditiis
        </Heading>
        <p>
          Exercitationem dolorum sed incidunt commodi sapiente fuga. Qui qui
          minima nulla ullam alias magnam et. Reiciendis ea voluptatem ab nisi
          est aut repudiandae eum magnam. Iusto ex ut velit voluptatem sequi
          facere voluptas.
        </p>
        <p>
          Vel ut ullam veritatis aut quaerat a eveniet. Voluptatem molestias
          atque rerum quam eos doloremque dolor dolor non. Rerum laudantium
          provident eos voluptas minus sit mollitia ex neque. Ea est ut est. Id
          quaerat repudiandae sint autem architecto adipisci est.
        </p>
        <Heading id="non-nisi" level={2}>
          Non nisi similique
        </Heading>
        <p>
          Non ut id. Dolorem in ex voluptas quis quod ut facere. Laboriosam non
          necessitatibus mollitia voluptatibus dolorem non ducimus. Et non illo
          aut quasi accusantium fugiat laudantium veritatis. Odit dicta vel et
          et rem ipsa nihil. Possimus architecto voluptatibus labore repellat
          sint aperiam reprehenderit est ratione.
        </p>
        <p>
          Nemo quod est ex ut et quasi. Sed minima voluptatem dolore. Non dolore
          placeat eos qui praesentium sunt dolores. Consequatur atque quibusdam
          tempore aut. Quas officiis adipisci consequatur nisi. Quasi veniam qui
          mollitia sapiente eius ratione necessitatibus nobis molestiae.
        </p>
      </PageBody>
    </>
  ),
};

/**
 * Page Stories - HeaderBodyTocSidebar
 */
export const HeaderBodyTocSidebar = Template.bind({});
HeaderBodyTocSidebar.args = {
  children: (
    <>
      <PageHeader
        heading="The page title"
        intro="Dolores deleniti et nemo fuga minus dicta enim dolores. Animi magnam dignissimos quaerat repellat autem alias. Recusandae pariatur autem et omnis eveniet. Magni fuga consequatur ut omnis debitis est error. Quos quae odit."
      />
      <PageSidebar>
        <TocWidget
          heading={<Heading level={2}>Table of Contents</Heading>}
          tree={[
            {
              children: [],
              depth: 2,
              id: 'sint-debitis',
              label: 'Sint debitis blanditiis',
            },
            {
              children: [],
              depth: 2,
              id: 'non-nisi',
              label: 'Non nisi similique',
            },
          ]}
        />
      </PageSidebar>
      <PageBody>
        <Heading id="sint-debitis" level={2}>
          Sint debitis blanditiis
        </Heading>
        <p>
          Exercitationem dolorum sed incidunt commodi sapiente fuga. Qui qui
          minima nulla ullam alias magnam et. Reiciendis ea voluptatem ab nisi
          est aut repudiandae eum magnam. Iusto ex ut velit voluptatem sequi
          facere voluptas.
        </p>
        <p>
          Vel ut ullam veritatis aut quaerat a eveniet. Voluptatem molestias
          atque rerum quam eos doloremque dolor dolor non. Rerum laudantium
          provident eos voluptas minus sit mollitia ex neque. Ea est ut est. Id
          quaerat repudiandae sint autem architecto adipisci est.
        </p>
        <Heading id="non-nisi" level={2}>
          Non nisi similique
        </Heading>
        <p>
          Non ut id. Dolorem in ex voluptas quis quod ut facere. Laboriosam non
          necessitatibus mollitia voluptatibus dolorem non ducimus. Et non illo
          aut quasi accusantium fugiat laudantium veritatis. Odit dicta vel et
          et rem ipsa nihil. Possimus architecto voluptatibus labore repellat
          sint aperiam reprehenderit est ratione.
        </p>
        <p>
          Nemo quod est ex ut et quasi. Sed minima voluptatem dolore. Non dolore
          placeat eos qui praesentium sunt dolores. Consequatur atque quibusdam
          tempore aut. Quas officiis adipisci consequatur nisi. Quasi veniam qui
          mollitia sapiente eius ratione necessitatibus nobis molestiae.
        </p>
      </PageBody>
      <PageSidebar>
        <SharingWidget
          data={{
            excerpt:
              'Dolores deleniti et nemo fuga minus dicta enim dolores. Animi magnam dignissimos quaerat repellat autem alias. Recusandae pariatur autem et omnis eveniet. Magni fuga consequatur ut omnis debitis est error. Quos quae odit.',
            title: 'The page title',
            url: '#page',
          }}
          heading={<Heading level={2}>Share</Heading>}
          media={['diaspora', 'email', 'facebook']}
        />
      </PageSidebar>
    </>
  ),
};

/**
 * Page Stories - HeaderBodyFooter
 */
export const HeaderBodyFooter = Template.bind({});
HeaderBodyFooter.args = {
  children: (
    <>
      <PageHeader
        heading="The page title"
        intro="Dolores deleniti et nemo fuga minus dicta enim dolores. Animi magnam dignissimos quaerat repellat autem alias. Recusandae pariatur autem et omnis eveniet. Magni fuga consequatur ut omnis debitis est error. Quos quae odit."
      />
      <PageBody>
        <Heading level={2}>Sint debitis blanditiis</Heading>
        <p>
          Exercitationem dolorum sed incidunt commodi sapiente fuga. Qui qui
          minima nulla ullam alias magnam et. Reiciendis ea voluptatem ab nisi
          est aut repudiandae eum magnam. Iusto ex ut velit voluptatem sequi
          facere voluptas.
        </p>
        <p>
          Vel ut ullam veritatis aut quaerat a eveniet. Voluptatem molestias
          atque rerum quam eos doloremque dolor dolor non. Rerum laudantium
          provident eos voluptas minus sit mollitia ex neque. Ea est ut est. Id
          quaerat repudiandae sint autem architecto adipisci est.
        </p>
        <Heading level={2}>Non nisi similique</Heading>
        <p>
          Non ut id. Dolorem in ex voluptas quis quod ut facere. Laboriosam non
          necessitatibus mollitia voluptatibus dolorem non ducimus. Et non illo
          aut quasi accusantium fugiat laudantium veritatis. Odit dicta vel et
          et rem ipsa nihil. Possimus architecto voluptatibus labore repellat
          sint aperiam reprehenderit est ratione.
        </p>
        <p>
          Nemo quod est ex ut et quasi. Sed minima voluptatem dolore. Non dolore
          placeat eos qui praesentium sunt dolores. Consequatur atque quibusdam
          tempore aut. Quas officiis adipisci consequatur nisi. Quasi veniam qui
          mollitia sapiente eius ratione necessitatibus nobis molestiae.
        </p>
      </PageBody>
      <PageFooter
        readMoreAbout={[
          { id: 1, name: 'Topic 1', url: '#topic1' },
          { id: 2, name: 'Topic 2', url: '#topic2' },
        ]}
      />
    </>
  ),
};

/**
 * Page Stories - HeaderBodyComments
 */
export const HeaderBodyComments = Template.bind({});
HeaderBodyComments.args = {
  children: (
    <>
      <PageHeader
        heading="The page title"
        intro="Dolores deleniti et nemo fuga minus dicta enim dolores. Animi magnam dignissimos quaerat repellat autem alias. Recusandae pariatur autem et omnis eveniet. Magni fuga consequatur ut omnis debitis est error. Quos quae odit."
      />
      <PageBody>
        <Heading level={2}>Sint debitis blanditiis</Heading>
        <p>
          Exercitationem dolorum sed incidunt commodi sapiente fuga. Qui qui
          minima nulla ullam alias magnam et. Reiciendis ea voluptatem ab nisi
          est aut repudiandae eum magnam. Iusto ex ut velit voluptatem sequi
          facere voluptas.
        </p>
        <p>
          Vel ut ullam veritatis aut quaerat a eveniet. Voluptatem molestias
          atque rerum quam eos doloremque dolor dolor non. Rerum laudantium
          provident eos voluptas minus sit mollitia ex neque. Ea est ut est. Id
          quaerat repudiandae sint autem architecto adipisci est.
        </p>
        <Heading level={2}>Non nisi similique</Heading>
        <p>
          Non ut id. Dolorem in ex voluptas quis quod ut facere. Laboriosam non
          necessitatibus mollitia voluptatibus dolorem non ducimus. Et non illo
          aut quasi accusantium fugiat laudantium veritatis. Odit dicta vel et
          et rem ipsa nihil. Possimus architecto voluptatibus labore repellat
          sint aperiam reprehenderit est ratione.
        </p>
        <p>
          Nemo quod est ex ut et quasi. Sed minima voluptatem dolore. Non dolore
          placeat eos qui praesentium sunt dolores. Consequatur atque quibusdam
          tempore aut. Quas officiis adipisci consequatur nisi. Quasi veniam qui
          mollitia sapiente eius ratione necessitatibus nobis molestiae.
        </p>
      </PageBody>
      <PageComments comments={comments} pageId={1} />
    </>
  ),
};

/**
 * Page Stories - SectionedPage
 */
export const SectionedPage = Template.bind({});
SectionedPage.args = {
  children: (
    <>
      <PageSection>
        <Heading level={2}>A section title</Heading>
        <p>
          Illo temporibus nihil maiores nesciunt. Veritatis distinctio aperiam
          culpa eveniet incidunt eos harum porro labore. Soluta culpa unde
          adipisci fugiat voluptas eos.
        </p>
      </PageSection>
      <PageSection variant="dark">
        <Heading level={2}>Another section title</Heading>
        <p>
          Sint consequatur animi eum beatae. Non corporis quos quia et magnam.
          Cumque molestiae blanditiis aut. Et suscipit iusto laudantium iusto
          dignissimos.
        </p>
      </PageSection>
      <PageSection>
        <Heading level={2}>A third section title</Heading>
        <p>
          Omnis corporis perferendis animi iste quidem placeat est minus. Enim
          autem consequatur voluptatem provident qui culpa. Aliquid aliquam
          consequatur non explicabo ut distinctio quis a non. Delectus unde odio
          eveniet temporibus omnis. Reprehenderit consequatur minima in
          consequatur saepe est sed. Accusantium quia quae magnam expedita nihil
          rerum omnis temporibus perspiciatis.
        </p>
      </PageSection>
    </>
  ),
  hasSections: true,
};
