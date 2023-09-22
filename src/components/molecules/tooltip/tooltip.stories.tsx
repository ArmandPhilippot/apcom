import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Tooltip } from './tooltip';
import { useState } from 'react';

/**
 * Switch - Storybook Meta
 */
export default {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  args: {},
  argTypes: {},
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = ({
  isOpen,
  onToggle: _onToggle,
  ...args
}) => {
  const [isOpened, setIsOpened] = useState(isOpen);

  const toggle = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Tooltip {...args} isOpen={isOpened} onToggle={toggle} />
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
