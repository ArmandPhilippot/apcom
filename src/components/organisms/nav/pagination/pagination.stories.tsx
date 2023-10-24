import type { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  Pagination,
  type RenderPaginationItemAriaLabel,
  type RenderPaginationLink,
} from './pagination';

/**
 * Pagination - Storybook Meta
 */
export default {
  title: 'Organisms/Nav/Pagination',
  component: Pagination,
  args: {
    siblings: 1,
  },
  argTypes: {
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
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

const renderLink: RenderPaginationLink = (num: number) => `#page-${num}`;

const renderItemAriaLabel: RenderPaginationItemAriaLabel = ({
  kind,
  pageNumber,
  isCurrentPage,
}) => {
  switch (kind) {
    case 'backward':
      return 'Go to previous page';
    case 'forward':
      return 'Go to next page';
    case 'number':
    default:
      return isCurrentPage
        ? `Current page, page ${pageNumber}`
        : `Go to page ${pageNumber}`;
  }
};

/**
 * Pagination Stories - More than 5 pages and current page is near the beginning
 */
export const RightEllipsis = Template.bind({});
RightEllipsis.args = {
  current: 2,
  siblings: 2,
  renderItemAriaLabel,
  renderLink,
  total: 50,
};

/**
 * Pagination Stories - More than 5 pages and current page is near the end
 */
export const LeftEllipsis = Template.bind({});
LeftEllipsis.args = {
  current: 49,
  siblings: 2,
  renderItemAriaLabel,
  renderLink,
  total: 50,
};

/**
 * Pagination Stories - More than 5 pages and current page is near the middle
 */
export const BothEllipsis = Template.bind({});
BothEllipsis.args = {
  current: 25,
  siblings: 2,
  renderItemAriaLabel,
  renderLink,
  total: 50,
};

/**
 * Pagination Stories - Less than 5 pages
 */
export const WithoutEllipsis = Template.bind({});
WithoutEllipsis.args = {
  current: 2,
  siblings: 2,
  renderItemAriaLabel,
  renderLink,
  total: 5,
};

/**
 * Pagination Stories - First page selected
 */
export const WithoutBackwardLink = Template.bind({});
WithoutBackwardLink.args = {
  current: 1,
  siblings: 2,
  renderItemAriaLabel,
  renderLink,
  total: 5,
};

/**
 * Pagination Stories - Last page selected
 */
export const WithoutForwardLink = Template.bind({});
WithoutForwardLink.args = {
  current: 5,
  siblings: 2,
  renderItemAriaLabel,
  renderLink,
  total: 5,
};
