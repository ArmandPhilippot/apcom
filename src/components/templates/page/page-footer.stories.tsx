import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Page } from './page';
import { PageFooter } from './page-footer';

/**
 * PageFooter - Storybook Meta
 */
export default {
  title: 'Templates/Page/Footer',
  component: PageFooter,
  argTypes: {
    readMoreAbout: {
      control: {
        type: null,
      },
      description: 'An array of page links.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof PageFooter>;

const Template: ComponentStory<typeof PageFooter> = (args) => (
  <Page>
    <PageFooter {...args} />
  </Page>
);

/**
 * PageFooter Stories - Footer
 */
export const Footer = Template.bind({});
Footer.args = {
  readMoreAbout: [
    { id: 1, name: 'Topic 1', url: '#topic1' },
    { id: 2, name: 'Topic 2', url: '#topic2' },
  ],
};
