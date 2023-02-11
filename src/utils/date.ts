import dayjs from 'dayjs';

export const getCalendarColumns = (date: dayjs.Dayjs) => {
  const startDate = dayjs(date).startOf('month');
  const endDate = dayjs(date).endOf('month');

  const beforeLength = dayjs(startDate).get('day');
  const beforeColumns = new Array(beforeLength).fill(null).map((_, index) => {
    return dayjs(startDate).subtract(beforeLength - index, 'day');
  });

  const length = dayjs(endDate).get('date');
  const columns = new Array(length).fill(null).map((_, index) => {
    return dayjs(startDate).add(index, 'day');
  });

  const afterLength = 6 - dayjs(endDate).get('day');
  const afterColumns = new Array(afterLength).fill(null).map((_, index) => {
    return dayjs(endDate).add(index + 1, 'day');
  });

  return [...beforeColumns, ...columns, ...afterColumns];
};
