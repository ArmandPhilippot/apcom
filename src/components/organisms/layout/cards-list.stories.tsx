import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card, CardBody, CardHeader, CardTitle } from '../../molecules';
import {
  CardsList as CardsListComponent,
  type CardsListItem,
} from './cards-list';

/**
 * CardsList - Storybook Meta
 */
export default {
  title: 'Organisms/Layout',
  component: CardsListComponent,
  argTypes: {
    items: {
      description: 'The cards data.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    isOrdered: {
      control: {
        type: 'boolean',
      },
      description: 'Should the list be ordered?',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof CardsListComponent>;

const Template: ComponentStory<typeof CardsListComponent> = (args) => (
  <CardsListComponent {...args} />
);

const items: CardsListItem[] = [
  {
    id: 'card-1',
    card: (
      <Card>
        <CardHeader>
          <CardTitle>Et alias omnis</CardTitle>
        </CardHeader>
        <CardBody>
          Rerum voluptatem sint sint sit dignissimos. Labore totam possimus
          tempore atque veniam. Doloremque tenetur quidem beatae veritatis quo.
          Quaerat voluptatem deleniti voluptas quia. Qui voluptatem iure iste
          expedita et sed beatae.
        </CardBody>
      </Card>
    ),
  },
  {
    id: 'card-2',
    card: (
      <Card>
        <CardHeader>
          <CardTitle>Fugiat magnam nesciunt</CardTitle>
        </CardHeader>
        <CardBody>
          Sit corporis animi ea. Earum asperiores error et. Aliquid quia et
          consequatur. Magnam sit ut facere explicabo vel dolorem earum
          assumenda. Aspernatur inventore quod libero est.
        </CardBody>
      </Card>
    ),
  },
  {
    id: 'card-3',
    card: (
      <Card>
        <CardHeader>
          <CardTitle>Asperiores eum quas</CardTitle>
        </CardHeader>
        <CardBody>
          Doloremque ut cupiditate distinctio aperiam. Neque tempora unde
          perferendis asperiores. Doloremque velit vel quam. Temporibus itaque
          non non exercitationem.
        </CardBody>
      </Card>
    ),
  },
];

/**
 * Layout Stories - Cards list
 */
export const CardsList = Template.bind({});
CardsList.args = {
  items,
};
