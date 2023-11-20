import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Page } from './page';
import { PageHeader } from './page-header';

/**
 * PageHeader - Storybook Meta
 */
export default {
  title: 'Templates/Page/Header',
  component: PageHeader,
  argTypes: {
    meta: {
      control: {
        type: null,
      },
      description: 'Define the page meta.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args) => (
  <Page>
    <PageHeader {...args} />
  </Page>
);

/**
 * PageHeader Stories - TitleOnly
 */
export const TitleOnly = Template.bind({});
TitleOnly.args = {
  heading: 'The page title',
};

/**
 * PageHeader Stories - TitleAndIntro
 */
export const TitleAndIntro = Template.bind({});
TitleAndIntro.args = {
  heading: 'The page title',
  intro:
    'Eos similique impedit dolor illo. Rerum voluptates corporis quod et molestiae eum. Ut tenetur repellat hic eum. Doloremque et illum sequi aspernatur.',
};

/**
 * PageHeader Stories - TitleAndMeta
 */
export const TitleAndMeta = Template.bind({});
TitleAndMeta.args = {
  heading: 'The page title',
  meta: {
    author: 'Robin_Schroeder77',
    publicationDate: '2023-11-15',
    updateDate: '2023-11-16',
  },
};

/**
 * PageHeader Stories - All
 */
export const All = Template.bind({});
All.args = {
  heading: 'The page title',
  intro:
    'Eos similique impedit dolor illo. Rerum voluptates corporis quod et molestiae eum. Ut tenetur repellat hic eum. Doloremque et illum sequi aspernatur.',
  meta: {
    author: 'Robin_Schroeder77',
    publicationDate: '2023-11-15',
    updateDate: '2023-11-16',
  },
};
