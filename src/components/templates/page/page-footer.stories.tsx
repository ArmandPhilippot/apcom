import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './page';
import { PageFooter, type PageFooterProps } from './page-footer';

const WrappedPageFooter = (props: PageFooterProps) => (
  <Page>
    <PageFooter {...props} />
  </Page>
);

const meta = {
  component: PageFooter,
  title: 'Templates/Page/PageFooter',
  render: WrappedPageFooter,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    readMoreAbout: [
      { id: 1, name: 'Topic 1', url: '#topic1' },
      { id: 2, name: 'Topic 2', url: '#topic2' },
    ],
  },
};
