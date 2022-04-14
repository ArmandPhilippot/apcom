import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import SearchComponent from './search';

export default {
  title: 'Organisms/Toolbar',
  component: SearchComponent,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the modal wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    isActive: {
      control: {
        type: null,
      },
      description: 'Define the modal state: either opened or closed.',
      type: {
        name: 'boolean',
        required: true,
      },
    },
    setIsActive: {
      control: {
        type: null,
      },
      description: 'A callback function to update modal state.',
      type: {
        name: 'function',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof SearchComponent>;

const Template: ComponentStory<typeof SearchComponent> = ({
  isActive,
  setIsActive: _setIsActive,
  ...args
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isActive);

  return (
    <IntlProvider locale="en">
      <SearchComponent isActive={isOpen} setIsActive={setIsOpen} {...args} />
    </IntlProvider>
  );
};

export const Search = Template.bind({});
Search.args = {
  isActive: false,
};
