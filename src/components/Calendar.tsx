import { FC, memo, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import dayjs from 'dayjs';

import { getCalendarColumns } from '../utils/date';
import ListHeader from './ListHeader';
import Column from './Column';

interface ICalendar {
  selectedDate: dayjs.Dayjs;
  onPressLeft: () => void;
  onPressHeaderDate: () => void;
  onPressRight: () => void;
  onPressDate: (date: dayjs.Dayjs) => () => void;
}

const Calendar: FC<ICalendar> = ({
  selectedDate,
  onPressLeft,
  onPressHeaderDate,
  onPressRight,
  onPressDate,
}) => {
  const calendarColumns = useMemo(() => getCalendarColumns(selectedDate), [selectedDate]);

  const ListHeaderComponent = useCallback(() => {
    return (
      <ListHeader
        paddingHorizontal={20}
        currentDate={selectedDate}
        onPressLeft={onPressLeft}
        onPressHeaderDate={onPressHeaderDate}
        onPressRight={onPressRight}
      />
    );
  }, [selectedDate, onPressLeft, onPressHeaderDate, onPressRight]);

  const keyExtractor = useCallback((_: unknown, index: number) => `${index}`, []);

  const renderItem = useCallback<ListRenderItem<dayjs.Dayjs>>(
    ({ item }) => {
      return (
        <Column
          paddingHorizontal={20}
          selectedDate={selectedDate}
          item={item}
          onPress={onPressDate(item)}
        />
      );
    },
    [selectedDate, onPressDate]
  );

  return (
    <FlatList
      data={calendarColumns}
      numColumns={7}
      scrollEnabled={false}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default memo(Calendar);
