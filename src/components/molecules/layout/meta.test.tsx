import { render, screen } from '@tests/utils';
import { getFormattedDate } from '@utils/helpers/dates';
import Meta from './meta';

const data = {
  publication: { date: '2022-04-09' },
  thematics: [
    <a key="category1" href="#">
      Category 1
    </a>,
    <a key="category2" href="#">
      Category 2
    </a>,
  ],
};

describe('Meta', () => {
  it('format a date string', () => {
    render(<Meta data={data} />);
    expect(
      screen.getByText(getFormattedDate(data.publication.date))
    ).toBeInTheDocument();
  });
});
