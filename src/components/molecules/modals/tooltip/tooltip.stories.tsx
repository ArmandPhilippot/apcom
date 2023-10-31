import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useBoolean } from '../../../../utils/hooks';
import { Tooltip } from './tooltip';

/**
 * Switch - Storybook Meta
 */
export default {
  title: 'Molecules/Modals/Tooltip',
  component: Tooltip,
  args: {},
  argTypes: {},
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = ({
  isOpen,
  onToggle: _onToggle,
  ...args
}) => {
  const { deactivate, state: isOpened, toggle } = useBoolean(isOpen);

  return (
    <div style={{ position: 'relative' }}>
      <Tooltip
        {...args}
        isOpen={isOpened}
        onClickOutside={deactivate}
        onToggle={toggle}
      />
    </div>
  );
};

/**
 * Tooltip Stories - Example
 */
export const Example = Template.bind({});
Example.args = {
  children:
    'Inventore natus dignissimos aut illum modi asperiores. Et voluptatibus delectus.',
  heading: 'A title',
  isOpen: false,
};
