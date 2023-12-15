import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './page';
import { PageHeader, type PageHeaderProps } from './page-header';

const WrappedPageHeader = (props: PageHeaderProps) => (
  <Page>
    <PageHeader {...props} />
  </Page>
);

const meta = {
  component: PageHeader,
  title: 'Templates/Page/PageHeader',
  render: WrappedPageHeader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {
  args: {
    heading: 'The page title',
  },
};

export const TitleAndIntro: Story = {
  args: {
    heading: 'The page title',
    intro:
      'Eos similique impedit dolor illo. Rerum voluptates corporis quod et molestiae eum. Ut tenetur repellat hic eum. Doloremque et illum sequi aspernatur.',
  },
};

export const TitleAndMeta: Story = {
  args: {
    heading: 'The page title',
    meta: {
      author: 'Robin_Schroeder77',
      publicationDate: '2023-11-15',
      updateDate: '2023-11-16',
    },
  },
};

export const TitleMetaAndIntro: Story = {
  args: {
    heading: 'The page title',
    intro:
      'Eos similique impedit dolor illo. Rerum voluptates corporis quod et molestiae eum. Ut tenetur repellat hic eum. Doloremque et illum sequi aspernatur.',
    meta: {
      author: 'Robin_Schroeder77',
      publicationDate: '2023-11-15',
      updateDate: '2023-11-16',
    },
  },
};
