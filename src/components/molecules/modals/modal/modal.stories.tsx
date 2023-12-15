import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Icon } from '../../../atoms';
import { Modal } from './modal';

const meta = {
  component: Modal,
  title: 'Molecules/Modals/Modal',
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  },
};

export const PrimaryWithCloseBtn: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    closeBtnLabel: 'Close the modal',
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    icon: <Icon aria-hidden shape="help" />,
  },
};

export const PrimaryWithHeading: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    heading: <Heading level={3}>Aut provident eum</Heading>,
  },
};

export const PrimaryWithIconAndHeading: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    heading: <Heading level={3}>Aut provident eum</Heading>,
    icon: <Icon aria-hidden shape="help" />,
  },
};

export const PrimaryWithCloseBtnAndHeading: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    closeBtnLabel: 'Close the modal',
    heading: <Heading level={3}>Aut provident eum</Heading>,
  },
};

export const PrimaryWithCloseBtnAndIcon: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    closeBtnLabel: 'Close the modal',
    icon: <Icon aria-hidden shape="help" />,
  },
};

export const PrimaryWithCloseBtnIconAndHeading: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    closeBtnLabel: 'Close the modal',
    heading: <Heading level={3}>Aut provident eum</Heading>,
    icon: <Icon aria-hidden shape="help" />,
  },
};

export const Secondary: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    kind: 'secondary',
  },
};

export const SecondaryWithCloseBtn: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    closeBtnLabel: 'Close the modal',
    kind: 'secondary',
  },
};

export const SecondaryWithHeading: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    heading: <Heading level={3}>Aut provident eum</Heading>,
    kind: 'secondary',
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    icon: <Icon aria-hidden shape="help" />,
    kind: 'secondary',
  },
};

export const SecondaryWithCloseBtnAndHeading: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    closeBtnLabel: 'Close the modal',
    heading: <Heading level={3}>Aut provident eum</Heading>,
    kind: 'secondary',
  },
};

export const SecondaryWithCloseBtnAndIcon: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    closeBtnLabel: 'Close the modal',
    icon: <Icon aria-hidden shape="help" />,
    kind: 'secondary',
  },
};

export const SecondaryWithIconAndHeading: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    heading: <Heading level={3}>Aut provident eum</Heading>,
    icon: <Icon aria-hidden shape="help" />,
    kind: 'secondary',
  },
};

export const SecondaryWithCloseBtnIconAndHeading: Story = {
  args: {
    children:
      'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
    closeBtnLabel: 'Close the modal',
    heading: <Heading level={3}>Aut provident eum</Heading>,
    icon: <Icon aria-hidden shape="help" />,
    kind: 'secondary',
  },
};
