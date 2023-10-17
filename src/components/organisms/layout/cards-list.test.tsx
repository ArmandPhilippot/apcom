import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Card, CardBody, CardHeader, CardTitle } from '../../molecules';
import { CardsList, type CardsListItem } from './cards-list';

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

describe('CardsList', () => {
  it('renders a list of cards', () => {
    render(<CardsList items={items} />);
    expect(rtlScreen.getAllByRole('heading', { level: 2 })).toHaveLength(
      items.length
    );
  });
});
