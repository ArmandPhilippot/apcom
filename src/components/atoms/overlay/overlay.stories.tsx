import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { Button } from '../buttons';
import { Overlay, type OverlayProps } from './overlay';

type OverlayTemplateProps = OverlayProps & {
  isActive?: boolean;
};

const OverlayTemplate = ({
  isActive: active = false,
  ...props
}: OverlayTemplateProps) => {
  const [isActive, setIsActive] = useState(active);

  const handleClick = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  return (
    <div>
      <p>
        Ad eos id. In nihil fugit nisi dolorem numquam fuga aut quod voluptatem.
        Dicta id nisi quia laboriosam sit ipsam deserunt ex. Omnis quia error
        ipsum ea numquam quia veniam omnis voluptatem. Dolor corrupti mollitia
        quod fugit est animi totam sed.
      </p>
      <p>
        Eum et laudantium eaque cumque. Voluptatem voluptas fugit incidunt quos
        voluptatibus velit et voluptatem laboriosam. Et voluptas ut quia
        mollitia eum voluptatem. Similique cum ratione ea illo autem facilis
        laudantium.
      </p>
      <Button onClick={handleClick}>Open overlay</Button>
      {isActive ? <Overlay {...props} onClick={handleClick} /> : null}
    </div>
  );
};

const meta = {
  title: 'Atoms/Overlay',
  component: Overlay,
  render: OverlayTemplate,
} satisfies Meta<typeof Overlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          background: '#FFF',
          padding: '1rem',
          margin: '1rem',
        }}
      >
        The modal contents.
      </div>
    ),
    isActive: true,
  },
};
