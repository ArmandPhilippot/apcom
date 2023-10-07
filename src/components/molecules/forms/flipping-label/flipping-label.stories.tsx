import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useCallback, useState } from 'react';
import { Button, Icon } from '../../../atoms';
import { FlippingLabel } from './flipping-label';

export default {
  title: 'Molecules/Forms/FlippingLabel',
  component: FlippingLabel,
  argTypes: {
    'aria-label': {
      control: {
        type: 'text',
      },
      description: 'An accessible name for the label.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    children: {
      control: {
        type: null,
      },
      description: 'An icon for the label front face.',
      type: {
        name: 'function',
        required: true,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the label.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    htmlFor: {
      control: {
        type: null,
      },
      description: 'Bind the label to a field by id.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    isActive: {
      control: {
        type: 'boolean',
      },
      description:
        'Which side of the label should be displayed? True for the close icon.',
      type: {
        name: 'boolean',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof FlippingLabel>;

const Template: ComponentStory<typeof FlippingLabel> = ({
  isActive,
  ...args
}) => {
  const [active, setActive] = useState<boolean>(isActive);
  const updateState = useCallback(() => setActive((prev) => !prev), []);

  return (
    <Button kind="neutral" onClick={updateState} shape="initial" type="button">
      <FlippingLabel {...args} isActive={active} />
    </Button>
  );
};

export const Active = Template.bind({});
Active.args = {
  icon: <Icon shape="magnifying-glass" />,
  isActive: true,
  label: 'Close the search',
};

export const Inactive = Template.bind({});
Inactive.args = {
  icon: <Icon shape="magnifying-glass" />,
  isActive: false,
  label: 'Open the search',
};
