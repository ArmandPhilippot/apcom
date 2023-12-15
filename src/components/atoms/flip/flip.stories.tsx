import type { Meta, StoryObj } from '@storybook/react';
import { Flip } from './flip';
import { FlipSide } from './flip-side';

const meta = {
  component: Flip,
  title: 'Atoms/Flip',
} satisfies Meta<typeof Flip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    children: (
      <>
        <FlipSide style={{ padding: '10px' }}>
          Consequatur natus possimus quia consequatur placeat consectetur. Quia
          vel magnam. Dolorem in quas non inventore aut sapiente. Consequuntur
          est cum et.
        </FlipSide>
        <FlipSide isBack style={{ background: '#eee', padding: '10px' }}>
          Iusto voluptatem repudiandae odit quo amet. Dolores vitae et neque
          minima velit. Ad consequatur assumenda qui placeat aut consectetur
          officia numquam illo. Neque quos voluptate ipsam eum ipsa officiis et
          autem non.
        </FlipSide>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    children: (
      <>
        <FlipSide style={{ padding: '10px' }}>
          Consequatur natus possimus quia consequatur placeat consectetur. Quia
          vel magnam. Dolorem in quas non inventore aut sapiente. Consequuntur
          est cum et.
        </FlipSide>
        <FlipSide isBack style={{ background: '#eee', padding: '10px' }}>
          Iusto voluptatem repudiandae odit quo amet. Dolores vitae et neque
          minima velit. Ad consequatur assumenda qui placeat aut consectetur
          officia numquam illo. Neque quos voluptate ipsam eum ipsa officiis et
          autem non.
        </FlipSide>
      </>
    ),
    direction: 'vertical',
  },
};
