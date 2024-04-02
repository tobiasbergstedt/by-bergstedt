import { useTranslation } from 'react-i18next';

export enum FormatType {
  DATE = 'date',
  TIME = 'time',
  DATE_AND_TIME = 'date_and_time',
}

function formatDate(
  inputDate: string,
  formatType: FormatType = FormatType.DATE,
): string {
  // Use the same port as you do in the server file
  const date = new Date(inputDate);

  const { t } = useTranslation();

  // Define month names
  const monthNames = [
    t('misc.months.january'),
    t('misc.months.february'),
    t('misc.months.march'),
    t('misc.months.april'),
    t('misc.months.may'),
    t('misc.months.june'),
    t('misc.months.july'),
    t('misc.months.august'),
    t('misc.months.september'),
    t('misc.months.october'),
    t('misc.months.november'),
    t('misc.months.december'),
  ];

  // Extract date components
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const hour = date.getHours();
  const minute = date.getMinutes();

  // Format the date components based on the formatType
  switch (formatType) {
    case FormatType.DATE:
      return `${day} ${monthNames[monthIndex]}`;
    case FormatType.TIME:
      return `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
    case FormatType.DATE_AND_TIME:
      return `${day} ${monthNames[monthIndex]}, ${hour
        .toString()
        .padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    default:
      throw new Error('Invalid formatType');
  }
}

export function formatDateToLocaleString(inputDate: string): string {
  const dateString = new Date(inputDate);
  const formattedDate = !isNaN(dateString.getTime())
    ? dateString.toLocaleString().replace('T', ' ')
    : new Date(new Date().getFullYear(), 0, 1)
        .toLocaleString()
        .replace('T', ' ');

  return formattedDate;
}

export function getMonthNameFromDate(originalDate: string): string {
  // Create a Date object from the epoch
  const { t } = useTranslation();

  const date = new Date(originalDate);

  // Define month names
  const monthNames = [
    t('misc.months.january'),
    t('misc.months.february'),
    t('misc.months.march'),
    t('misc.months.april'),
    t('misc.months.may'),
    t('misc.months.june'),
    t('misc.months.july'),
    t('misc.months.august'),
    t('misc.months.september'),
    t('misc.months.october'),
    t('misc.months.november'),
    t('misc.months.december'),
  ];

  // Get the month name from the months array using the month index from the date
  const monthName = monthNames[date.getMonth()];

  return monthName;
}

export default formatDate;
