import { ComponentMeta, ComponentStory } from '@storybook/react';
import DescriptionListComponent, {
  DescriptionListItem,
} from './description-list';

/**
 * DescriptionList - Storybook Meta
 */
export default {
  title: 'Atoms/Typography/Lists',
  component: DescriptionListComponent,
  args: {
    layout: 'column',
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the list wrapper',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    items: {
      control: {
        type: null,
      },
      description: 'The list items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    layout: {
      control: {
        type: 'select',
      },
      description: 'The list layout.',
      options: ['column', 'inline'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'column' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof DescriptionListComponent>;

const Template: ComponentStory<typeof DescriptionListComponent> = (args) => (
  <DescriptionListComponent {...args} />
);

const items: DescriptionListItem[] = [
  { id: 'term-1', term: 'Term 1:', value: ['Value for term 1'] },
  { id: 'term-2', term: 'Term 2:', value: ['Value for term 2'] },
  {
    id: 'term-3',
    term: 'Term 3:',
    value: ['Value 1 for term 3', 'Value 2 for term 3', 'Value 3 for term 3'],
  },
  { id: 'term-4', term: 'Term 4:', value: ['Value for term 4'] },
];

/**
 * List Stories - Description list
 */
export const DescriptionList = Template.bind({});
DescriptionList.args = {
  items,
};
