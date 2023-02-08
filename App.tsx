import { memo, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/native';
import dayjs from 'dayjs';

import theme from './src/theme';
import { getCalendarColumns } from './src/utils/date';
import { Column } from './src/components';

const Container = styled(SafeAreaView)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
});

const App = () => {
  const calendarColumns = useMemo(() => getCalendarColumns(), []);

  const keyExtractor = useCallback((_: dayjs.Dayjs, index: number) => `${index}`, []);

  const renderItem = useCallback<ListRenderItem<dayjs.Dayjs>>(({ item }) => {
    return <Column paddingHorizontal={20} item={item} />;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar style="auto" />

        <FlatList
          data={calendarColumns}
          numColumns={7}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </Container>
    </ThemeProvider>
  );
};

export default memo(App);
