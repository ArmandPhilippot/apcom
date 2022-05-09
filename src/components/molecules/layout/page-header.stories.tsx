import { ComponentMeta, ComponentStory } from '@storybook/react';
import PageHeader from './page-header';

/**
 * Page Header - Storybook Meta
 */
export default {
  title: 'Molecules/Layout/PageHeader',
  component: PageHeader,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the header element.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    intro: {
      control: {
        type: 'text',
      },
      description: 'The page introduction.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    meta: {
      description: 'The page metadata.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The page title.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args) => (
  <PageHeader {...args} />
);

const meta = {
  publication: { date: '2022-04-09' },
  thematics: [
    <a key="category1" href="#">
      Category 1
    </a>,
    <a key="category2" href="#">
      Category 2
    </a>,
  ],
};

/**
 * Page Header Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  title: 'Excepturi nesciunt illum',
};

/**
 * Page Header Stories - With introduction
 */
export const WithIntro = Template.bind({});
WithIntro.args = {
  intro:
    'Minima dolor nihil. Velit atque odit totam enim. Quisquam reprehenderit ut et inventore et nihil libero exercitationem. Cumque similique magni placeat et. Et sed est cumque labore. Et quia similique.',
  title: 'Excepturi nesciunt illum',
};

/**
 * Page Header Stories - With meta
 */
export const WithMeta = Template.bind({});
WithMeta.args = {
  meta,
  title: 'Excepturi nesciunt illum',
};

/**
 * Page Header Stories - With introduction and meta
 */
export const WithIntroAndMeta = Template.bind({});
WithIntroAndMeta.args = {
  intro:
    'Minima dolor nihil. Velit atque odit totam enim. Quisquam reprehenderit ut et inventore et nihil libero exercitationem. Cumque similique magni placeat et. Et sed est cumque labore. Et quia similique.',
  meta,
  title: 'Excepturi nesciunt illum',
};
