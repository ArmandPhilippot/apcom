import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading, Icon } from '../../../atoms';
import { Modal } from './modal';

/**
 * Modals - Storybook Meta
 */
export default {
  title: 'Molecules/Modals/Modal',
  component: Modal,
  args: {},
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

/**
 * Modal Stories - Primary
 */
export const Primary = Template.bind({});
Primary.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
};

/**
 * Modal Stories - Primary with close button
 */
export const PrimaryWithCloseBtn = Template.bind({});
PrimaryWithCloseBtn.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  closeBtnLabel: 'Close the modal',
};

/**
 * Modal Stories - Primary with icon
 */
export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  icon: <Icon aria-hidden shape="help" />,
};

/**
 * Modal Stories - Primary with heading
 */
export const PrimaryWithHeading = Template.bind({});
PrimaryWithHeading.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  heading: <Heading level={3}>Aut provident eum</Heading>,
};

/**
 * Modal Stories - Primary with icon and heading
 */
export const PrimaryWithIconAndHeading = Template.bind({});
PrimaryWithIconAndHeading.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  heading: <Heading level={3}>Aut provident eum</Heading>,
  icon: <Icon aria-hidden shape="help" />,
};

/**
 * Modal Stories - Primary with close button and heading
 */
export const PrimaryWithCloseBtnAndHeading = Template.bind({});
PrimaryWithCloseBtnAndHeading.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  closeBtnLabel: 'Close the modal',
  heading: <Heading level={3}>Aut provident eum</Heading>,
};

/**
 * Modal Stories - Primary with close button and icon
 */
export const PrimaryWithCloseBtnAndIcon = Template.bind({});
PrimaryWithCloseBtnAndIcon.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  closeBtnLabel: 'Close the modal',
  icon: <Icon aria-hidden shape="help" />,
};

/**
 * Modal Stories - Primary with close button, icon and heading
 */
export const PrimaryWithCloseBtnIconAndHeading = Template.bind({});
PrimaryWithCloseBtnIconAndHeading.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  closeBtnLabel: 'Close the modal',
  heading: <Heading level={3}>Aut provident eum</Heading>,
  icon: <Icon aria-hidden shape="help" />,
};

/**
 * Modal Stories - Secondary
 */
export const Secondary = Template.bind({});
Secondary.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  kind: 'secondary',
};

/**
 * Modal Stories - Secondary with close button
 */
export const SecondaryWithCloseBtn = Template.bind({});
SecondaryWithCloseBtn.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  kind: 'secondary',
  closeBtnLabel: 'Close the modal',
};

/**
 * Modal Stories - Secondary with heading
 */
export const SecondaryWithHeading = Template.bind({});
SecondaryWithHeading.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  heading: <Heading level={3}>Aut provident eum</Heading>,
  kind: 'secondary',
};

/**
 * Modal Stories - Secondary with icon
 */
export const SecondaryWithIcon = Template.bind({});
SecondaryWithIcon.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  kind: 'secondary',
  icon: <Icon aria-hidden shape="help" />,
};

/**
 * Modal Stories - Secondary with close button and heading
 */
export const SecondaryWithCloseBtnAndHeading = Template.bind({});
SecondaryWithCloseBtnAndHeading.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  heading: <Heading level={3}>Aut provident eum</Heading>,
  kind: 'secondary',
  closeBtnLabel: 'Close the modal',
};

/**
 * Modal Stories - Secondary with close button and icon
 */
export const SecondaryWithCloseBtnAndIcon = Template.bind({});
SecondaryWithCloseBtnAndIcon.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  closeBtnLabel: 'Close the modal',
  icon: <Icon aria-hidden shape="help" />,
  kind: 'secondary',
};

/**
 * Modal Stories - Secondary with icon and heading
 */
export const SecondaryWithIconAndHeading = Template.bind({});
SecondaryWithIconAndHeading.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  heading: <Heading level={3}>Aut provident eum</Heading>,
  icon: <Icon aria-hidden shape="help" />,
  kind: 'secondary',
};

/**
 * Modal Stories - Secondary with close button, icon and heading
 */
export const SecondaryWithCloseBtnIconAndHeading = Template.bind({});
SecondaryWithCloseBtnIconAndHeading.args = {
  children:
    'Sed atque molestiae voluptatem possimus nisi recusandae qui assumenda. Quia rerum sed. Et autem impedit ut nam impedit. Quam ex facere pariatur est. Voluptatem hic beatae asperiores suscipit. Accusamus dolorum fugit placeat alias vel tenetur. Expedita fuga quos ipsum cum ea est expedita quia eaque.',
  heading: <Heading level={3}>Aut provident eum</Heading>,
  closeBtnLabel: 'Close the modal',
  icon: <Icon aria-hidden shape="help" />,
  kind: 'secondary',
};
