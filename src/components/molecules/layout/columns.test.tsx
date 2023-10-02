import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Column, Columns } from './columns';

const column1 =
  'Non praesentium voluptas quisquam ex est. Distinctio accusamus facilis libero in aut. Et veritatis quo impedit fugit amet sit accusantium. Ut est rerum asperiores sint libero eveniet. Molestias placeat recusandae suscipit eligendi sunt hic.';

const column2 =
  'Quo perspiciatis mollitia non et. Modi voluptatem molestias. Facere ut molestiae exercitationem non nesciunt unde adipisci. Non cupiditate provident repudiandae. Natus quia necessitatibus libero enim earum quam et.';

const column3 =
  'Libero aut ab neque voluptatem commodi. Quam quia voluptatem iusto dolorum. Enim ipsa totam corrupti qui cum quidem ea. Eos sed aliquam porro consequatur officia sed.';

const column4 =
  'Ratione placeat ea ea. Explicabo rem eaque voluptatibus. Nihil nulla culpa et dolor numquam omnis est. Quis quas excepturi est dignissimos ducimus et ad quis quis. Eos enim et nam delectus.';

describe('Columns', () => {
  it('renders all the children', () => {
    render(
      <Columns count={2}>
        <Column key="column-1">{column1}</Column>
        <Column key="column-2">{column2}</Column>
        <Column key="column-3">{column3}</Column>
        <Column key="column-4">{column4}</Column>
      </Columns>
    );

    expect(rtlScreen.getByText(column1)).toBeInTheDocument();
    expect(rtlScreen.getByText(column2)).toBeInTheDocument();
    expect(rtlScreen.getByText(column3)).toBeInTheDocument();
    expect(rtlScreen.getByText(column4)).toBeInTheDocument();
  });

  it('renders the right number of columns', () => {
    render(
      <Columns count={3}>
        <Column key="column-1">{column1}</Column>
        <Column key="column-2">{column2}</Column>
        <Column key="column-3">{column3}</Column>
        <Column key="column-4">{column4}</Column>
      </Columns>
    );

    const container = rtlScreen.getByText(column1).parentElement;

    expect(container).toHaveClass('wrapper--3-columns');
  });
});
