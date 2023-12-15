import type { Meta, StoryObj } from '@storybook/react';
import { useBoolean } from '../../../../utils/hooks';
import { Tooltip, type TooltipProps } from './tooltip';

const ControlledTooltip = ({
  isOpen,
  onToggle: _onToggle,
  ...args
}: TooltipProps) => {
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

const meta = {
  component: Tooltip,
  title: 'Molecules/Modals/Tooltip',
  render: ControlledTooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children:
      'Inventore natus dignissimos aut illum modi asperiores. Et voluptatibus delectus.',
    heading: 'A title',
    isOpen: false,
  },
};
