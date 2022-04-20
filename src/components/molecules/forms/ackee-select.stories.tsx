import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import AckeeSelect from './ackee-select';

/**
 * AckeeSelect - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Select',
  component: AckeeSelect,
  argTypes: {
    initialValue: {
      control: {
        type: 'select',
      },
      description: 'Initial selected option.',
      options: ['full', 'partial'],
      type: {
        name: 'string',
        required: true,
      },
    },
    labelClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the label wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    tooltipClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the tooltip wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
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
} as ComponentMeta<typeof AckeeSelect>;

const Template: ComponentStory<typeof AckeeSelect> = (args) => (
  <AckeeSelect {...args} />
);

/**
 * Select Stories - Ackee select
 */
export const Ackee = Template.bind({});
Ackee.args = {
  initialValue: 'full',
};
