import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { getFormattedDate } from '../../../utils/helpers';
import { Meta } from './meta';

const data = {
  publication: { date: '2022-04-09' },
  thematics: [
    <a key="category1" href="#a">
      Category 1
    </a>,
    <a key="category2" href="#b">
      Category 2
    </a>,
  ],
};

describe('Meta', () => {
  it('format a date string', () => {
    render(<Meta data={data} />);
    expect(
      rtlScreen.getByText(getFormattedDate(data.publication.date))
    ).toBeInTheDocument();
  });
});
