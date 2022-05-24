import { ComponentMeta, ComponentStory } from '@storybook/react';
import ColumnComponent from './column';

export default {
  title: 'Atoms/Layout/Column',
  component: ColumnComponent,
  argTypes: {
    children: {
      description: 'The column body.',
      type: {
        name: 'array',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof ColumnComponent>;

const Template: ComponentStory<typeof ColumnComponent> = (args) => (
  <ColumnComponent {...args} />
);

const body =
  'Non praesentium voluptas quisquam ex est. Distinctio accusamus facilis libero in aut. Et veritatis quo impedit fugit amet sit accusantium. Ut est rerum asperiores sint libero eveniet. Molestias placeat recusandae suscipit eligendi sunt hic.';

export const Column = Template.bind({});
Column.args = {
  children: body,
};
