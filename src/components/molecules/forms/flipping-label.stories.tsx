import MagnifyingGlass from '@components/atoms/icons/magnifying-glass';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import FlippingLabel from './flipping-label';

export default {
  title: 'Organisms/Forms/FlippingLabel',
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

  return (
    <div onClick={() => setActive(!active)}>
      <FlippingLabel isActive={active} {...args} />
    </div>
  );
};

export const Active = Template.bind({});
Active.args = {
  children: <MagnifyingGlass />,
  isActive: true,
};

export const Inactive = Template.bind({});
Inactive.args = {
  children: <MagnifyingGlass />,
  isActive: false,
};
