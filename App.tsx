import { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/native';
import dayjs from 'dayjs';

import theme from './src/theme';
import { getCalendarColumns } from './src/utils/date';
import { Column, ListHeader } from './src/components';

const Container = styled(SafeAreaView)({
  flex: 1,
  alignItems: 'center',
  backgroundColor: '#fff',
});

const App = () => {
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  const calendarColumns = useMemo(() => getCalendarColumns(selectedDate), [selectedDate]);

  const ListHeaderComponent = useCallback(() => {
    return (
      <ListHeader
        paddingHorizontal={20}
        currentDate={selectedDate}
        onPressLeft={() => setSelectedDate(dayjs(selectedDate).subtract(1, 'month'))}
        onPressDate={() => setIsDatePicker(true)}
        onPressRight={() => setSelectedDate(dayjs(selectedDate).add(1, 'month'))}
      />
    );
  }, [selectedDate]);

  const keyExtractor = useCallback((_: dayjs.Dayjs, index: number) => `${index}`, []);

  const renderItem = useCallback<ListRenderItem<dayjs.Dayjs>>(
    ({ item }) => {
      return (
        <Column
          paddingHorizontal={20}
          selectedDate={selectedDate}
          item={item}
          onPress={() => setSelectedDate(item)}
        />
      );
    },
    [selectedDate]
  );

  const onConfirm = useCallback((date: Date) => {
    setSelectedDate(dayjs(date));
    setIsDatePicker(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar style="auto" />

        <FlatList
          data={calendarColumns}
          numColumns={7}
          ListHeaderComponent={ListHeaderComponent}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />

        <DateTimePickerModal
          isVisible={isDatePicker}
          mode="date"
          onConfirm={onConfirm}
          onCancel={onConfirm}
        />
      </Container>
    </ThemeProvider>
  );
};

export default memo(App);
