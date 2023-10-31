import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useToggle } from '../../../utils/hooks';
import { Button } from '../buttons';
import { Overlay } from './overlay';

/**
 * Overlay - Storybook Meta
 */
export default {
  title: 'Atoms/Overlay',
  component: Overlay,
  argTypes: {},
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = ({ isVisible, ...props }) => {
  const [isActive, toggle] = useToggle(isVisible);

  return (
    <div>
      <p>
        Itaque reprehenderit sint rerum placeat et sapiente similique ut
        distinctio. Libero illo reprehenderit qui quaerat dolorem. Officiis
        asperiores sapiente eaque. Aut numquam porro quasi delectus excepturi
        aut eaque et. Commodi et necessitatibus provident blanditiis rem qui
        atque.
      </p>
      <p>
        Aut architecto vitae dolor hic explicabo iure quia quae beatae.
        Exercitationem nulla dignissimos doloribus sunt at nisi. A modi quasi
        est sed quas repellendus vel sed dolores. Sed neque aperiam adipisci eos
        autem. Libero omnis quis aut quas omnis magni harum et.
      </p>
      <Button onClick={toggle}>Open overlay</Button>
      <Overlay {...props} isVisible={isActive} onClick={toggle} />
    </div>
  );
};

/**
 * Overlay Stories - Hidden
 */
export const Hidden = Template.bind({});
Hidden.args = {
  children: (
    <div style={{ background: '#FFF', margin: '1rem', padding: '1rem' }}>
      Some modal contents.
    </div>
  ),
  isVisible: false,
};

/**
 * Overlay Stories - Visible
 */
export const Visible = Template.bind({});
Visible.args = {
  children: (
    <div style={{ background: '#FFF', margin: '1rem', padding: '1rem' }}>
      Some modal contents.
    </div>
  ),
  isVisible: true,
};
