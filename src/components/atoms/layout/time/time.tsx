import {
  type ForwardRefRenderFunction,
  type TimeHTMLAttributes,
  forwardRef,
} from 'react';
import { useIntl } from 'react-intl';
import { CONFIG } from '../../../../utils/config';

type GetDateOptionsConfig = {
  hasDay: boolean;
  hasMonth: boolean;
  hasWeekDay: boolean;
  hasYear: boolean;
};

const getDateOptions = ({
  hasDay,
  hasMonth,
  hasWeekDay,
  hasYear,
}: GetDateOptionsConfig): Intl.DateTimeFormatOptions => {
  const day: Intl.DateTimeFormatOptions['day'] = 'numeric';
  const month: Intl.DateTimeFormatOptions['month'] = 'long';
  const weekDay: Intl.DateTimeFormatOptions['weekday'] = 'long';
  const year: Intl.DateTimeFormatOptions['year'] = 'numeric';
  const options: [
    keyof Intl.DateTimeFormatOptions,
    Intl.DateTimeFormatOptions[keyof Intl.DateTimeFormatOptions],
  ][] = [];

  if (hasDay) options.push(['day', day]);
  if (hasMonth) options.push(['month', month]);
  if (hasWeekDay) options.push(['weekday', weekDay]);
  if (hasYear) options.push(['year', year]);

  return Object.fromEntries(options);
};

export type TimeProps = Omit<
  TimeHTMLAttributes<HTMLTimeElement>,
  'children' | 'dateTime'
> & {
  /**
   * A valid date string.
   */
  date: string;
  /**
   * Should we hide the day number?
   *
   * @default false
   */
  hideDay?: boolean;
  /**
   * Should we hide the month?
   *
   * @default false
   */
  hideMonth?: boolean;
  /**
   * Should we hide the year?
   *
   * @default false
   */
  hideYear?: boolean;
  /**
   * The current locale.
   *
   * @default CONFIG.locales.defaultLocale
   */
  locale?: string;
  /**
   * Should we display the time in addition to the date?
   *
   * @default false
   */
  showTime?: boolean;
  /**
   * Should we display the week day?
   *
   * @default false
   */
  showWeekDay?: boolean;
};

const TimeWithRef: ForwardRefRenderFunction<HTMLTimeElement, TimeProps> = (
  {
    date,
    hideDay = false,
    hideMonth = false,
    hideYear = false,
    locale = CONFIG.locales.defaultLocale,
    showTime = false,
    showWeekDay = false,
    ...props
  },
  ref
) => {
  const intl = useIntl();
  const dateOptions = getDateOptions({
    hasDay: !hideDay,
    hasMonth: !hideMonth,
    hasWeekDay: showWeekDay,
    hasYear: !hideYear,
  });
  const fullDate = new Date(date);
  const dateTime = fullDate.toISOString();
  const readableDate = fullDate.toLocaleDateString(locale, dateOptions);
  const formattedTime = fullDate.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
  });
  const readableTime =
    locale === 'fr' ? formattedTime.replace(':', 'h') : formattedTime;

  return (
    <time {...props} dateTime={dateTime} ref={ref}>
      {showTime
        ? intl.formatMessage(
            {
              defaultMessage: '{date} at {time}',
              description: 'Time: readable date and time',
              id: '8q5PXx',
            },
            { date: readableDate, time: readableTime }
          )
        : readableDate}
    </time>
  );
};

/**
 * Time component.
 *
 * Render a date with an optional time in a `<time>` element.
 */
export const Time = forwardRef(TimeWithRef);
