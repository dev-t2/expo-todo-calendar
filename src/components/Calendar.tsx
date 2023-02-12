import { FC, memo, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import dayjs from 'dayjs';

import { getCalendarColumns } from '../utils/date';
import ListHeader from './ListHeader';
import Column from './Column';

interface ICalendar {
  selectedDate: dayjs.Dayjs;
  onPressLeft: () => void;
  onPressDate: () => void;
  onPressRight: () => void;
  onPressColumn: (date: dayjs.Dayjs) => () => void;
}

const Calendar: FC<ICalendar> = ({
  selectedDate,
  onPressLeft,
  onPressDate,
  onPressRight,
  onPressColumn,
}) => {
  const calendarColumns = useMemo(() => getCalendarColumns(selectedDate), [selectedDate]);

  const ListHeaderComponent = useCallback(() => {
    return (
      <ListHeader
        paddingHorizontal={20}
        currentDate={selectedDate}
        onPressLeft={onPressLeft}
        onPressDate={onPressDate}
        onPressRight={onPressRight}
      />
    );
  }, [selectedDate, onPressLeft, onPressDate, onPressRight]);

  const keyExtractor = useCallback((_: unknown, index: number) => `${index}`, []);

  const renderItem = useCallback<ListRenderItem<dayjs.Dayjs>>(
    ({ item }) => {
      return (
        <Column
          paddingHorizontal={20}
          selectedDate={selectedDate}
          item={item}
          onPress={onPressColumn(item)}
        />
      );
    },
    [selectedDate, onPressColumn]
  );

  return (
    <FlatList
      data={calendarColumns}
      numColumns={7}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default memo(Calendar);
