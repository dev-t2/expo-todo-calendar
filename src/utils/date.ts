import dayjs from 'dayjs';

const fillCalendarData = (start: dayjs.Dayjs, end: dayjs.Dayjs, monthData: dayjs.Dayjs[]) => {
  const beforeLength = dayjs(start).get('day');
  const afterLength = 6 - dayjs(end).get('day');

  const beforeData = new Array(beforeLength).fill(null).map((_, index) => {
    return dayjs(start).subtract(beforeLength - index, 'day');
  });

  const afterData = new Array(afterLength).fill(null).map((_, index) => {
    return dayjs(end).add(index + 1, 'day');
  });

  return [...beforeData, ...monthData, ...afterData];
};

export const getCalendarData = (now: dayjs.Dayjs) => {
  const start = dayjs(now).startOf('month');
  const end = dayjs(now.endOf('month'));
  const monthLength = dayjs(end).get('date');

  const monthData = new Array(monthLength).fill(null).map((_, index) => {
    return dayjs(start).add(index, 'day');
  });

  return fillCalendarData(start, end, monthData);
};
