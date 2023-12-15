import type { Meta, StoryObj } from '@storybook/react';
import { Fieldset } from '../fieldset';
import { Legend, type LegendProps } from './legend';

const FieldsetWithLegend = (args: LegendProps) => (
  <Fieldset>
    <Legend {...args} />
  </Fieldset>
);

const meta = {
  component: Legend,
  title: 'Atoms/Forms/Legend',
  render: FieldsetWithLegend,
} satisfies Meta<typeof Legend>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'A legend',
  },
};
