import type { Meta, StoryObj } from '@storybook/react';
import {
  LoadingPageComments,
  type LoadingPageCommentsProps,
} from './loading-page-comments';
import { Page } from './page';

const WrappedLoadingPageComments = (props: LoadingPageCommentsProps) => (
  <Page>
    <LoadingPageComments {...props} />
  </Page>
);

const meta = {
  component: LoadingPageComments,
  title: 'Templates/Page/LoadingPageComments',
  render: WrappedLoadingPageComments,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LoadingPageComments>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
