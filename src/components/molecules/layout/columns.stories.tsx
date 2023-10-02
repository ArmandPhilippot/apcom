import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Column, Columns } from './columns';

export default {
  title: 'Molecules/Layout/Columns',
  args: {
    responsive: true,
  },
  component: Columns,
  argTypes: {
    children: {
      description: 'The columns.',
      type: {
        name: 'function',
        required: true,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the columns wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    count: {
      control: {
        type: 'number',
        min: 2,
        max: 4,
      },
      description: 'The number of columns.',
      type: {
        name: 'number',
        required: true,
      },
    },
    responsive: {
      control: {
        type: 'boolean',
      },
      description: 'Should the columns be stacked on small devices?',
      table: {
        category: 'Options',
        defaultValue: { summary: true },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof Columns>;

const Template: ComponentStory<typeof Columns> = (args) => (
  <Columns {...args} />
);

const column1 =
  'Non praesentium voluptas quisquam ex est. Distinctio accusamus facilis libero in aut. Et veritatis quo impedit fugit amet sit accusantium. Ut est rerum asperiores sint libero eveniet. Molestias placeat recusandae suscipit eligendi sunt hic.';

const column2 =
  'Quaerat eum dignissimos tempore ab enim. Iusto inventore nemo. Veritatis voluptas quod maxime earum soluta illo atque vel. Nam et corrupti. Dolorem qui cum dolorem. Aut ut nobis. Mollitia qui voluptas rerum et quibusdam.';

const column3 =
  'Libero aut ab neque voluptatem commodi. Quam quia voluptatem iusto dolorum. Enim ipsa totam corrupti qui cum quidem ea. Eos sed aliquam porro consequatur officia sed.';

const column4 =
  'Ratione placeat ea ea. Explicabo rem eaque voluptatibus. Nihil nulla culpa et dolor numquam omnis est. Quis quas excepturi est dignissimos ducimus et ad quis quis. Eos enim et nam delectus.';

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  children: [
    <Column key="column-1">{column1}</Column>,
    <Column key="column-2">{column2}</Column>,
    <Column key="column-3">{column3}</Column>,
    <Column key="column-4">{column4}</Column>,
  ],
  count: 2,
};

export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
  children: [
    <Column key="column-1">{column1}</Column>,
    <Column key="column-2">{column2}</Column>,
    <Column key="column-3">{column3}</Column>,
    <Column key="column-4">{column4}</Column>,
  ],
  count: 3,
};

export const FourColumns = Template.bind({});
FourColumns.args = {
  children: [
    <Column key="column-1">{column1}</Column>,
    <Column key="column-2">{column2}</Column>,
    <Column key="column-3">{column3}</Column>,
    <Column key="column-4">{column4}</Column>,
  ],
  count: 4,
};
