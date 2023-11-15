import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { CONFIG } from '../../../../utils/config';
import { Time } from './time';

describe('Time', () => {
  it('renders a date wrapped in a time element', () => {
    const date = '2022';

    render(<Time date={date} />);

    expect(rtlScreen.getByText(new RegExp(date))).toHaveAttribute(
      'datetime',
      new Date(date).toISOString()
    );
  });

  it('can show the time in addition to the date', () => {
    const date = '2022';

    render(<Time date={date} showTime />);

    expect(rtlScreen.getByText(new RegExp(date))).toHaveTextContent(/\sat\s/);
  });

  it('can show the week day in front of the date', () => {
    const date = new Date();

    render(<Time date={date.toDateString()} showWeekDay />);

    expect(
      rtlScreen.getByText(new RegExp(`${date.getFullYear()}`))
    ).toHaveTextContent(
      new Intl.DateTimeFormat(CONFIG.locales.defaultLocale, {
        weekday: 'long',
      }).format(date)
    );
  });
});
