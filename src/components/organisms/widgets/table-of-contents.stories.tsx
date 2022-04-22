import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import ToCWidget from './table-of-contents';

/**
 * TableOfContents - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets',
  component: ToCWidget,
  argTypes: {
    wrapper: {
      control: {
        type: null,
      },
      description:
        'A reference to the HTML element that contains the headings.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
} as ComponentMeta<typeof ToCWidget>;

const Template: ComponentStory<typeof ToCWidget> = (args) => (
  <ToCWidget {...args} />
);

/**
 * Widgets Stories - Table of Contents
 */
export const TableOfContents = Template.bind({});
TableOfContents.args = {};
