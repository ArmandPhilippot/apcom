import type { Meta, StoryObj } from '@storybook/react';
import {
  Pagination,
  type RenderPaginationItemAriaLabel,
  type RenderPaginationLink,
} from './pagination';

const meta = {
  component: Pagination,
  title: 'Organisms/Nav/Pagination',
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const RightEllipsis: Story = {
  args: {
    current: 2,
    siblings: 2,
    renderItemAriaLabel,
    renderLink,
    total: 50,
  },
};

export const LeftEllipsis: Story = {
  args: {
    current: 49,
    siblings: 2,
    renderItemAriaLabel,
    renderLink,
    total: 50,
  },
};

export const BothEllipsis: Story = {
  args: {
    current: 25,
    siblings: 2,
    renderItemAriaLabel,
    renderLink,
    total: 50,
  },
};

export const WithoutEllipsis: Story = {
  args: {
    current: 2,
    siblings: 2,
    renderItemAriaLabel,
    renderLink,
    total: 5,
  },
};

export const WithoutBackwardLink: Story = {
  args: {
    current: 1,
    siblings: 2,
    renderItemAriaLabel,
    renderLink,
    total: 5,
  },
};

export const WithoutForwardLink: Story = {
  args: {
    current: 5,
    siblings: 2,
    renderItemAriaLabel,
    renderLink,
    total: 5,
  },
};
