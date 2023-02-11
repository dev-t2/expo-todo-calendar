import { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  const calendarColumns = useMemo(() => getCalendarColumns(selectedDate), [selectedDate]);

  const ListHeaderComponent = useCallback(() => {
    return <ListHeader paddingHorizontal={20} currentDate={selectedDate} />;
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
      </Container>
    </ThemeProvider>
  );
};

export default memo(App);
