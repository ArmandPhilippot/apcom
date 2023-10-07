import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flip as FlipComponent } from './flip';
import { FlipSide } from './flip-side';

/**
 * Flip - Storybook Meta
 */
export default {
  title: 'Atoms/Flip',
  component: FlipComponent,
  argTypes: {},
} as ComponentMeta<typeof FlipComponent>;

const Template: ComponentStory<typeof FlipComponent> = (args) => (
  <FlipComponent {...args} tabIndex={0} />
);

/**
 * Images Stories - Horizontal Flipping
 */
export const Horizontal = Template.bind({});
Horizontal.args = {
  children: (
    <>
      <FlipSide style={{ padding: '10px' }}>
        Consequatur natus possimus quia consequatur placeat consectetur. Quia
        vel magnam. Dolorem in quas non inventore aut sapiente. Consequuntur est
        cum et.
      </FlipSide>
      <FlipSide isBack style={{ background: '#eee', padding: '10px' }}>
        Iusto voluptatem repudiandae odit quo amet. Dolores vitae et neque
        minima velit. Ad consequatur assumenda qui placeat aut consectetur
        officia numquam illo. Neque quos voluptate ipsam eum ipsa officiis et
        autem non.
      </FlipSide>
    </>
  ),
};

/**
 * Images Stories - Vertical Flipping
 */
export const Vertical = Template.bind({});
Vertical.args = {
  children: (
    <>
      <FlipSide style={{ padding: '10px' }}>
        Consequatur natus possimus quia consequatur placeat consectetur. Quia
        vel magnam. Dolorem in quas non inventore aut sapiente. Consequuntur est
        cum et.
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
};
