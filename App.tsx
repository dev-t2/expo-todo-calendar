import { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, ImageSourcePropType, ListRenderItem, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/native';
import dayjs from 'dayjs';

import theme from './src/theme';
import { Calendar, Container } from './src/components';

const BackgroundImage = styled.Image(StyleSheet.absoluteFill);

interface ITodo {
  id: number;
  date: dayjs.Dayjs;
  content: string;
  isSuccess: boolean;
}

const App = () => {
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  const [todos] = useState<ITodo[]>([
    { id: 1, date: dayjs(), content: '공부하기', isSuccess: true },
    { id: 2, date: dayjs(), content: '운동하기', isSuccess: false },
  ]);
  // const [content, setContent] = useState('');

  const source = useMemo<ImageSourcePropType>(() => {
    return {
      uri: 'https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c',
    };
  }, []);

  const onPressLeft = useCallback(() => {
    setSelectedDate(dayjs(selectedDate).subtract(1, 'month'));
  }, [selectedDate]);

  const onPressHeaderDate = useCallback(() => {
    setIsDatePicker(true);
  }, []);

  const onPressRight = useCallback(() => {
    setSelectedDate(dayjs(selectedDate).add(1, 'month'));
  }, [selectedDate]);

  const onPressDate = useCallback(
    (date: dayjs.Dayjs) => () => {
      setSelectedDate(date);
    },
    []
  );

  const ListHeaderComponent = useCallback(() => {
    return (
      <Calendar
        selectedDate={selectedDate}
        onPressLeft={onPressLeft}
        onPressHeaderDate={onPressHeaderDate}
        onPressRight={onPressRight}
        onPressDate={onPressDate}
      />
    );
  }, [selectedDate, onPressLeft, onPressHeaderDate, onPressRight, onPressDate]);

  const keyExtractor = useCallback((_: unknown, index: number) => `${index}`, []);

  const renderItem = useCallback<ListRenderItem<ITodo>>(() => {
    return <></>;
  }, []);

  const onConfirm = useCallback((date: Date) => {
    setSelectedDate(dayjs(date));
    setIsDatePicker(false);
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Container>
          <BackgroundImage source={source} />

          <FlatList
            data={todos}
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
    </SafeAreaProvider>
  );
};

export default memo(App);
