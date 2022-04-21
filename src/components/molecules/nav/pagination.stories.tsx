import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import PaginationComponent from './pagination';

/**
 * Pagination - Storybook Meta
 */
export default {
  title: 'Molecules/Navigation/Pagination',
  component: PaginationComponent,
  argTypes: {
    'aria-label': {
      control: {
        type: 'text',
      },
      description: 'An accessible name for the pagination.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    baseUrl: {
      control: {
        type: 'text',
      },
      description: 'The url prefix.',
      table: {
        category: 'Options',
        defaultValue: { summary: '/page/' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the pagination wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    current: {
      control: {
        type: 'number',
      },
      description: 'The current page number.',
      type: {
        name: 'number',
        required: true,
      },
    },
    perPage: {
      control: {
        type: 'number',
      },
      description: 'The number of items per page.',
      type: {
        name: 'number',
        required: true,
      },
    },
    siblings: {
      control: {
        type: 'number',
      },
      description:
        'The number of pages to show next to the current page for one side.',
      table: {
        category: 'Options',
        defaultValue: { summary: 1 },
      },
      type: {
        name: 'number',
        required: false,
      },
    },
    total: {
      control: {
        type: 'number',
      },
      description: 'The total number of items.',
      type: {
        name: 'number',
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
} as ComponentMeta<typeof PaginationComponent>;

const Template: ComponentStory<typeof PaginationComponent> = (args) => (
  <PaginationComponent {...args} />
);

/**
 * Pagination Stories - Less than 5 pages
 */
export const WithoutDots = Template.bind({});
WithoutDots.args = {
  current: 2,
  perPage: 10,
  siblings: 2,
  total: 50,
};

/**
 * Pagination Stories - Truncated to the right.
 */
export const RightDots = Template.bind({});
RightDots.args = {
  current: 2,
  perPage: 10,
  siblings: 2,
  total: 80,
};

/**
 * Pagination Stories - Truncated to the left.
 */
export const LeftDots = Template.bind({});
LeftDots.args = {
  current: 7,
  perPage: 10,
  siblings: 2,
  total: 80,
};

/**
 * Pagination Stories - Truncated both sides.
 */
export const LeftAndRightDots = Template.bind({});
LeftAndRightDots.args = {
  current: 6,
  perPage: 10,
  siblings: 2,
  total: 150,
};

/**
 * Pagination Stories - Without previous link
 */
export const WithoutPreviousLink = Template.bind({});
WithoutPreviousLink.args = {
  current: 1,
  perPage: 10,
  siblings: 2,
  total: 50,
};

/**
 * Pagination Stories - Without next link
 */
export const WithoutNextLink = Template.bind({});
WithoutNextLink.args = {
  current: 5,
  perPage: 10,
  siblings: 2,
  total: 50,
};
