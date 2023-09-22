import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Modal } from './modal';
import { Heading } from '../headings';

/**
 * Switch - Storybook Meta
 */
export default {
  title: 'Atoms/Modals',
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
    'Inventore natus dignissimos aut illum modi asperiores. Et voluptatibus delectus.',
};

/**
 * Modal Stories - Primary With Heading
 */
export const PrimaryWithHeading = Template.bind({});
PrimaryWithHeading.args = {
  children:
    'Inventore natus dignissimos aut illum modi asperiores. Et voluptatibus delectus.',
  heading: <Heading level={3}>Aut provident eum</Heading>,
};

/**
 * Modal Stories - Secondary
 */
export const Secondary = Template.bind({});
Secondary.args = {
  children:
    'Inventore natus dignissimos aut illum modi asperiores. Et voluptatibus delectus.',
  kind: 'secondary',
};

/**
 * Modal Stories - Secondary with heading
 */
export const SecondaryWithHeading = Template.bind({});
SecondaryWithHeading.args = {
  children:
    'Inventore natus dignissimos aut illum modi asperiores. Et voluptatibus delectus.',
  heading: (
    <Heading isFake level={4}>
      Aut provident eum
    </Heading>
  ),
  kind: 'secondary',
};
